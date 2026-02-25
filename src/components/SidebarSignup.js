import React from 'react';

export default function SidebarSignup() {
  return (
    <div className="docs-signup-sidebar">
      <h4>Stay Updated</h4>
      <p>Get changelog updates and Geoman tips.</p>
      <form className="geoman-signup" data-placement="sidebar">
        <input type="email" name="email" placeholder="you@company.com" required />
        <input
          type="text"
          name="_hp"
          style={{ position: 'absolute', left: '-9999px' }}
          tabIndex={-1}
          autoComplete="off"
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
