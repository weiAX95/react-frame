import { useState } from 'react';

interface AppProps {
  title?: string; // 设置为可选属性
}

const App: React.FC<AppProps> = ({ title = 'React 18 App' }) => {
  const [count, setCount] = useState<number>(0);
  console.log('count', count);

  const handleClick = () => {
    setCount((prev: number) => prev + 1); // 这里是正确的
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="space-y-4">
        <p className="text-gray-600">
          当前计数: <span className="font-bold">{count}</span>
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleClick}
        >
          增加计数
        </button>
      </div>
    </div>
  );
};

export default App;
