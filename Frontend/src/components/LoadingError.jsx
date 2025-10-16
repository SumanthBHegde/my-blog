import React from "react";

const LoadingError = ({
  title = "Oops! We're having trouble loading this content",
  message = "Our server might be taking a quick nap. This usually takes 30-60 seconds on first load.",
  onRetry,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-forest-50 to-white rounded-2xl shadow-xl border border-forest-200 overflow-hidden">
        <div className="p-8 md:p-12 text-center">
          {/* Animated Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-forest-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-forest-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-forest-800 mb-4">
            {title}
          </h2>

          {/* Message */}
          <p className="text-base md:text-lg text-forest-600 mb-6 max-w-md mx-auto">
            {message}
          </p>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-forest-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-forest-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-forest-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span className="text-sm text-forest-500 font-medium">
              Please wait...
            </span>
          </div>

          {/* Helpful Tips */}
          <div className="bg-forest-50 rounded-xl p-4 mb-6 text-left max-w-md mx-auto">
            <h3 className="text-sm font-semibold text-forest-800 mb-2">
              💡 What's happening?
            </h3>
            <ul className="text-sm text-forest-600 space-y-1">
              <li>• The server wakes up after being idle</li>
              <li>• This is normal for free hosting services</li>
              <li>• Future loads will be instant!</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-forest-700 hover:to-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                🔄 Retry Now
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-forest-700 font-semibold rounded-xl shadow-md border-2 border-forest-300 hover:bg-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 transition-all duration-200"
            >
              Refresh Page
            </button>
          </div>

          {/* Timer Message */}
          <p className="mt-6 text-xs text-forest-500">
            Still not working after 60 seconds? Please refresh the page or come
            back in a moment.
          </p>
        </div>

        {/* Decorative Bottom Bar */}
        <div className="h-2 bg-gradient-to-r from-forest-500 via-forest-600 to-forest-500"></div>
      </div>
    </div>
  );
};

export default LoadingError;
