import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { MotionConfig } from 'framer-motion';
import AppRoutes from './AppRoutes';

export function render(url) {
  return renderToString(
    <MotionConfig reducedMotion="always">
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </MotionConfig>
  );
}
