import React, { useState, useEffect } from "react";

/**
 * CloudinaryImage Component
 *
 * Handles Cloudinary image loading with retry logic and fallback
 * Useful when Cloudinary takes time to process and serve images
 *
 * @param {string} src - Cloudinary image URL or local path
 * @param {string} fallback - Fallback image to show if loading fails
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS classes
 * @param {number} maxRetries - Maximum retry attempts (default: 5)
 * @param {number} retryDelay - Delay between retries in ms (default: 2000)
 */
const CloudinaryImage = ({
  src,
  fallback,
  alt = "",
  className = "",
  maxRetries = 5,
  retryDelay = 2000,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially
  const [hasError, setHasError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src);
    setRetryCount(0);
    setIsLoading(false); // Changed to false
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    // If we haven't exceeded max retries and the image is from Cloudinary
    if (retryCount < maxRetries && src && src.includes("cloudinary.com")) {
      setIsLoading(true);

      // Retry after delay
      setTimeout(() => {
        console.log(
          `Retrying Cloudinary image load (attempt ${
            retryCount + 1
          }/${maxRetries})`
        );
        setRetryCount((prev) => prev + 1);
        // Force reload by adding timestamp
        setImageSrc(`${src}?retry=${Date.now()}`);
      }, retryDelay);
    } else {
      // Max retries reached or not a Cloudinary image, show fallback
      console.log("Using fallback image");
      setIsLoading(false);
      setHasError(true);
      setImageSrc(fallback);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className="relative">
      <img
        src={imageSrc || fallback}
        alt={alt}
        className={`${className} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />

      {/* Loading indicator for Cloudinary images */}
      {isLoading && !hasError && src?.includes("cloudinary.com") && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-t-forest-600 border-gray-300 rounded-full animate-spin"></div>
            {retryCount > 0 && (
              <span className="text-xs text-gray-600">
                Loading... ({retryCount}/{maxRetries})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImage;
