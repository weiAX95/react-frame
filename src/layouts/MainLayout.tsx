import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default memo(MainLayout);
