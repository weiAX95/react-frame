/* eslint-disable */
/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOnDifferentValues: true,
    collapseGroups: false,
    logOwnerReasons: true,
    hotReloadBufferMs: 500,
    onlyLogs: true,
    titleColor: 'green',
    diffNameColor: 'aqua',
    // 自定义更新原因通知
    notifier: event => {
      console.group('Why Did You Render');
      console.log('Component:', event.ComponentName);
      console.log('Why did it render?', event.reason);
      console.log('Previous props:', event.prevProps);
      console.log('Next props:', event.nextProps);
      console.groupEnd();
    },
  });

  // 添加一些调试辅助
  // console.log('WDYR Configured in development mode');
}
