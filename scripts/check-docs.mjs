#!/usr/bin/env node
// Verify the documentation covers the library's public surface, using the
// snapshot in _meta/library-surface.json (regenerate it with
// `npm run docs:extract-surface`).
//
// Fails (exit 1) when:
//   - a draw/edit/helper mode has no matching doc page
//   - a geoman.edit / geoman.layers API method is never shown in the docs
//   - a mode doc page exists for a mode the library no longer has (orphan)
//
// Warns (does not fail) when the docs depend on an older library version than
// the snapshot was generated from.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(scriptDir, '..')

// Modes that intentionally have no standalone doc page (keep this list tiny and
// justified — every entry is a coverage hole the check will otherwise flag).
const UNDOCUMENTED_MODES = {
  draw: [],
  edit: [],
  helper: [],
}

const surfacePath = resolve(docsRoot, '_meta', 'library-surface.json')
if (!existsSync(surfacePath)) {
  console.error(
    `Missing ${surfacePath}. Run "npm run docs:extract-surface" first.`,
  )
  process.exit(1)
}
const surface = JSON.parse(readFileSync(surfacePath, 'utf8'))

const problems = []
const warnings = []

// --- mode coverage -------------------------------------------------------
// A mode <m> of type <t> is documented by docs/<t>-modes/<NN>-<t>-<m>.{md,mdx}
const stripPrefixExt = (name) =>
  name.replace(/^\d+[a-z]?-/, '').replace(/\.mdx?$/, '')

for (const [type, modes] of Object.entries(surface.modes)) {
  const dir = join(docsRoot, 'docs', `${type}-modes`)
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => /\.mdx?$/.test(f)) : []
  const documented = new Set(files.map(stripPrefixExt)) // e.g. "edit-add_hole"

  for (const mode of modes) {
    if (UNDOCUMENTED_MODES[type]?.includes(mode)) continue
    if (!documented.has(`${type}-${mode}`)) {
      problems.push(`Missing doc page for ${type} mode "${mode}" (expected docs/${type}-modes/NN-${type}-${mode}.mdx)`)
    }
  }

  // orphans: a "<type>-<x>" doc whose <x> is not a current mode
  const known = new Set([...modes, ...(UNDOCUMENTED_MODES[type] ?? [])])
  for (const docName of documented) {
    const mode = docName.startsWith(`${type}-`) ? docName.slice(type.length + 1) : null
    if (mode && !known.has(mode)) {
      problems.push(`Orphan doc page "docs/${type}-modes/...-${docName}.mdx" — no "${mode}" ${type} mode in the library`)
    }
  }
}

// --- API method coverage -------------------------------------------------
// Collect all doc text once; require each method to appear as a `.method(` call.
const allDocText = (() => {
  const out = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.mdx?$/.test(entry.name)) out.push(readFileSync(full, 'utf8'))
    }
  }
  walk(join(docsRoot, 'docs'))
  return out.join('\n')
})()

for (const [api, methods] of Object.entries(surface.api)) {
  for (const method of methods) {
    if (!allDocText.includes(`.${method}(`)) {
      problems.push(`geoman.${api}.${method}() is never shown in the docs (expected a \`.${method}(\` call)`)
    }
  }
}

// --- version drift (warning only) ----------------------------------------
try {
  const docsPkg = JSON.parse(readFileSync(resolve(docsRoot, 'package.json'), 'utf8'))
  const depRange =
    docsPkg.dependencies?.['@geoman-io/maplibre-geoman-pro'] ?? ''
  const depVer = depRange.replace(/^[\^~>=<\s]+/, '')
  const cmp = (a, b) => {
    const pa = a.split('.').map(Number)
    const pb = b.split('.').map(Number)
    for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0)
    return 0
  }
  if (depVer && surface.libraryVersion !== 'unknown' && cmp(depVer, surface.libraryVersion) < 0) {
    warnings.push(
      `docs depend on @geoman-io/maplibre-geoman-pro ${depRange} but the documented library is ${surface.libraryVersion}. ` +
        `Bump the dependency and re-run "npm install".`,
    )
  }
} catch {
  /* ignore */
}

// --- report --------------------------------------------------------------
for (const w of warnings) console.warn(`⚠️  ${w}`)

if (problems.length) {
  console.error(`\n✖ Documentation coverage check failed (${problems.length}):`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error(
    `\nRefresh the snapshot with "npm run docs:extract-surface" if the library surface changed,\n` +
      `then add/rename the missing doc pages.`,
  )
  process.exit(1)
}

console.log(
  `✓ Docs cover the library surface for @ ${surface.libraryVersion}: ` +
    `${surface.modes.draw.length} draw, ${surface.modes.edit.length} edit, ${surface.modes.helper.length} helper modes; ` +
    `${surface.api.edit.length} edit + ${surface.api.layers.length} layers API methods.`,
)
