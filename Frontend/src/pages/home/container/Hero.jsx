import React from "react";
import { images } from "../../../constants";
import Search from "../../../components/Search";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-earth-50 via-forest-50/30 to-earth-100/30 py-16 lg:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-forest-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-5 mx-auto">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-forest-100/80 backdrop-blur-sm rounded-full text-forest-700 text-sm font-medium mb-6 border border-forest-200/50">
              <span className="w-2 h-2 bg-forest-500 rounded-full mr-2 animate-pulse"></span>
              Welcome to Bhāga
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-forest-800 mb-6 leading-tight">
              Sharing my
              <span className="block bg-gradient-to-r from-forest-600 via-forest-500 to-earth-600 bg-clip-text text-transparent">
                experiences & thoughts
              </span>
              with the world
            </h1>

            <p className="text-lg md:text-xl text-forest-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join me on a journey through my personal experiences, insights,
              and thoughts about life, technology, creativity, and everything in
              between. Let's learn and grow together.
            </p>

            <div className="mb-8">
              <Search className="max-w-md mx-auto lg:mx-0" />
            </div>

            {/* Popular Tags */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <span className="text-forest-500 font-medium text-sm uppercase tracking-wider">
                Popular Topics
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {[
                  {
                    name: "Technology",
                    color: "from-forest-500 to-forest-600",
                  },
                  { name: "Travel", color: "from-forest-600 to-forest-700" },
                  { name: "Lifestyle", color: "from-earth-500 to-earth-600" },
                  { name: "Food", color: "from-forest-400 to-forest-500" },
                ].map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-r ${tag.color} text-white font-medium rounded-full text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-forest-400/20 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-earth-400/20 rounded-full blur-xl animate-pulse"></div>

              <div className="relative">
                <img
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  src={images.HeroImage}
                  alt="Community stories"
                />

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-earth-50/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-bounce">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-forest-500 to-forest-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <p className="text-xs text-forest-500">New story</p>
                      <p className="text-sm font-semibold text-forest-800">
                        Amazing Journey
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-earth-50/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-forest-500 to-earth-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📖</span>
                    </div>
                    <div>
                      <p className="text-xs text-forest-500">Reading</p>
                      <p className="text-sm font-semibold text-forest-800">
                        2.1k readers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
