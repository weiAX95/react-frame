import { useState, useCallback } from 'react';
import React from 'react';
import { useAdaptiveLayout } from '../hooks/useAdaptiveFontSize';

// 子组件
const ChildComponent = React.memo(({ value }: { value: number }) => {
  console.log('Child rendered with value:', value);
  return <div>Value: {value}</div>
});

// ChildComponent.whyDidYouRender = true;
const App = () => {
  useAdaptiveLayout();
  const [counter, setCounter] = useState(0);
  // 使用一个对象状态来确保触发重渲染
  const [, setTrigger] = useState({});

  const forceRerender = useCallback(() => {
    // 创建新对象来确保状态更新
    setTrigger({});
  }, []);

  console.log('App rendered');
  console.log('(๑¯㉨¯๑)');

  return (
    <div className="p-8 flex flex-col gap-4">
      <ChildComponent value={counter} />

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCounter(c => c + 1)}
        >
          Increment ({counter})
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={forceRerender}
        >
          Force Rerender
        </button>
      </div>

      <div className="text-gray-600">
        打开控制台查看重渲染日志
      </div>
    </div>
  );
};

if (process.env.NODE_ENV === 'development') {
  // App.whyDidYouRender = true;
}

export default App;