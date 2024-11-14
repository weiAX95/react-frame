import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAtom } from 'jotai';

import { useAdaptiveLayout } from '../hooks/useAdaptiveFontSize';
import { counterAtom, testState } from '../states';

// 路由
const App = () => {
  // 为了保证状态撕裂性,使用useAtom
  const [test, setTest] = useAtom(testState);
  const [counter, setCounter] = useState(1);

  // 添加渲染计数器
  const renderCount = React.useRef(0);
  console.log('renderCount', renderCount.current);

  useEffect(() => {
    renderCount.current += 1;
  });
  const handleIncrement = () => {
    console.log('handleIncrement', test);

    setTest(1);
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="contained">Hello world</Button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900"
          onClick={handleIncrement}
        >
          Increment ({counter})
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Force Rerender
        </button>
      </div>

      <div className="text-gray-600">Render count: {renderCount.current}</div>
    </div>
  );
};

if (process.env.NODE_ENV === 'development') {
  App.whyDidYouRender = true;
}

export default App;
