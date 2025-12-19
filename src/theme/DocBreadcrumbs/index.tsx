import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type { WrapperProps } from '@docusaurus/types';
import CopyAsMarkdown from '@site/src/components/CopyAsMarkdown';
import styles from './styles.module.css';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

export default function DocBreadcrumbsWrapper(props: Props): JSX.Element {
  return (
    <div className={styles.breadcrumbsRow}>
      <DocBreadcrumbs {...props} />
      <CopyAsMarkdown />
    </div>
  );
}
