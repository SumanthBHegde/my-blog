import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <section className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-forest-50/20 via-white to-forest-50/10">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-lg sm:rounded-xl p-8 sm:p-12 lg:p-16 shadow-sm hover:shadow-md transition-shadow text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-forest-100 to-earth-100 rounded-full mb-6">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-forest-600 to-earth-600 bg-clip-text text-transparent">
                  404
                </span>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-hard mb-4">
              Page Not Found
            </h1>
            <p className="text-base sm:text-lg text-dark-light mb-8 max-w-xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have
              been moved or deleted, or you may have mistyped the URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                Go to Homepage
              </Link>
              <Link
                to="/blog"
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary/10 transition-all"
              >
                Browse Articles
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm sm:text-base text-dark-light mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/about"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  About Us
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/contact"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Contact
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/profile"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFoundPage;
