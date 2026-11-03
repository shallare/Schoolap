import type { CSSProperties } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url?: string;
        'loading-anim-type'?: string;
        className?: string;
        style?: CSSProperties;
        [key: string]: unknown;
      };
    }
  }
}
