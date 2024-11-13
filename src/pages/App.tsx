import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Button from '@mui/material/Button';
import { useAtom } from 'jotai';

import useAdaptiveLayout from '../hooks/useAdaptiveFontSize';
import { testState } from '../states';

// 路由
function App() {
  useAdaptiveLayout();
  // 为了保证状态撕裂性,使用useAtom
  const [test, setTest] = useAtom(testState);
  const [counter] = useState(1);

  // 添加渲染计数器
  const renderCount = React.useRef(0);

  const handleIncrement = () => {
    setTest(1);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>APP</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="p-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <Button variant="contained">{test}</Button>
          <Button variant="contained">Hello world</Button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900"
            onClick={handleIncrement}
          >
            Increment ({counter})
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Force Rerender
          </button>
        </div>

        <div className="text-gray-600">
          Render count:
          {renderCount.current}
        </div>
      </div>
    </HelmetProvider>
  );
}

if (process.env.NODE_ENV === 'development') {
  App.whyDidYouRender = true;
}

export default App;
