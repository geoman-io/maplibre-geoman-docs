import React from 'react';
import GmMap from '@site/src/components/map/GmMap';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { PartialDeep } from 'type-fest';
import defaultOptions from '@site/src/components/map/default-options';


interface ComponentProps {
  gmOptions?: PartialDeep<typeof defaultOptions>;
}

const Component: React.FC<ComponentProps> = ({ gmOptions: gmOptionsOverride }) => {
  return (
    <BrowserOnly>
      {() => <GmMap gmOptions={gmOptionsOverride} />}
    </BrowserOnly>
  );
};

export default Component;
