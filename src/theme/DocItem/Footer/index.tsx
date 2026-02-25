import React, {type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      <div className="docs-signup-footer">
        <h4>Found this helpful?</h4>
        <p>Subscribe for changelog updates, tips, and new feature announcements.</p>
        <form className="geoman-signup" data-placement="page-footer">
          <input type="email" name="email" placeholder="you@company.com" required />
          <input type="text" name="name" placeholder="Name (optional)" />
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
      <Footer {...props} />
    </>
  );
}
