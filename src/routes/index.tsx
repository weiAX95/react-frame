import React from 'react';
import { RouteObject } from 'react-router-dom';
// 修改导入路径，确保匹配 tsconfig 中的 paths 配置
import PageNotFoundView from '@components/common/PageNotFoundView'; // 注意 components 后面要加路径

import MainLayout from '@layouts/MainLayout';
import HomePage from '@pages/Home'; // pages 后面要加具体文件

const mainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '404',
      element: <PageNotFoundView />,
    },
    {
      path: '*',
      element: <PageNotFoundView />,
    },
  ],
};

export default [mainRoutes];
