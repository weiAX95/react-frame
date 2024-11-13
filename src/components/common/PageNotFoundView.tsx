function PageNotFoundView() {
  const goHome = () => {
    window.location.href = '/';
  };
  const goBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number with Animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200 animate-pulse">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Custom SVG spinner */}
            <svg className="w-20 h-20 text-blue-500 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">页面未找到</h2>
          <p className="text-gray-600">抱歉，我们找不到您要访问的页面。它可能已被移动或不存在。</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm space-x-2"
          >
            {/* Home icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>返回首页</span>
          </button>

          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300 shadow-sm space-x-2"
          >
            {/* Back arrow icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>返回上一页</span>
          </button>
        </div>

        {/* Additional Tips */}
        <div className="mt-8 text-sm text-gray-500">
          <p>您可以尝试：</p>
          <ul className="mt-2 space-y-1">
            <li>• 检查输入的网址是否正确</li>
            <li>• 点击&quot;返回上一页&quot;重试</li>
            <li>• 返回首页重新开始</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageNotFoundView;
