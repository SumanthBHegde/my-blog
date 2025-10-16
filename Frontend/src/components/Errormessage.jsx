import { useState } from "react";

const ErrorMessage = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check for specific error types and provide helpful messages
  const getErrorDetails = () => {
    const msg = message?.toLowerCase() || "";

    if (
      msg.includes("network") ||
      msg.includes("fetch") ||
      msg.includes("failed to fetch")
    ) {
      return {
        title: "Connection Error",
        description:
          "Unable to connect to the server. The backend might be waking up (this takes 30-60 seconds on first load).",
        suggestions: [
          "Please wait a moment and try refreshing the page",
          "Check your internet connection",
          "The server may be starting up after being idle",
        ],
      };
    }

    if (msg.includes("cors") || msg.includes("access-control-allow-origin")) {
      return {
        title: "CORS Error",
        description: "Cross-origin request blocked.",
        suggestions: [
          "This is a configuration issue",
          "Please contact the administrator",
        ],
      };
    }

    if (msg.includes("404") || msg.includes("not found")) {
      return {
        title: "Not Found",
        description: "The requested resource was not found.",
        suggestions: ["Please try again or go back to the homepage"],
      };
    }

    if (msg.includes("401") || msg.includes("unauthorized")) {
      return {
        title: "Authentication Required",
        description: "You need to be logged in to access this.",
        suggestions: ["Please log in to continue"],
      };
    }

    return {
      title: "Error",
      description: message,
      suggestions: [
        "Please try again later",
        "If the problem persists, contact support",
      ],
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="w-full rounded-lg bg-red-50 border-l-4 border-red-500 mx-auto px-4 py-4 max-w-2xl shadow-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {errorDetails.title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorDetails.description}</p>
          </div>

          {errorDetails.suggestions && errorDetails.suggestions.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm font-medium text-red-800 hover:text-red-900 underline"
              >
                {isExpanded ? "Hide suggestions" : "Show suggestions"}
              </button>

              {isExpanded && (
                <ul className="mt-2 list-disc list-inside text-sm text-red-700 space-y-1">
                  {errorDetails.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
