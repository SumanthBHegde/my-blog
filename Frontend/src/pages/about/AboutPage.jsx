import React from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import {
  FaLinkedin,
  FaGithub,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";

const AboutPage = () => {
  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
  ];

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10 max-w-4xl">
        <BreadCrumbs data={breadCrumbsData} />
        {/* Header */}
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-800 mb-4">
            About Bhāga
          </h1>
          <div className="w-24 h-1 bg-forest-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A personal space where thoughts, experiences, and creativity come
            together
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-forest-800 mb-4">
              Welcome to My Corner of the Internet
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Hello! I'm{" "}
              <span className="font-semibold text-forest-700">
                Sumanth Hegde
              </span>
              , and this is Bhāga – my personal blog where I share my journey
              through life, technology, and everything in between. The word
              "Bhāga" (भाग) means "part" or "share" in Sanskrit, reflecting the
              essence of this space where I share my experiences and
              perspectives with you.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Based in the beautiful town of Sirsi, Karnataka, I'm passionate
              about technology, creativity, and continuous learning. Through
              this blog, I aim to document my experiences, share insights, and
              connect with like-minded individuals.
            </p>
          </div>

          {/* What You'll Find */}
          <div className="bg-gradient-to-br from-forest-50 to-earth-50 rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-forest-800 mb-6">
              What You'll Find Here
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-forest-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-forest-700 mb-1">
                      Technology & Development
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Insights into web development, programming, and the latest
                      tech trends
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-forest-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-forest-700 mb-1">
                      Personal Experiences
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Stories from my life, lessons learned, and moments of
                      growth
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-forest-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-forest-700 mb-1">
                      Creative Projects
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Showcasing my latest projects, experiments, and creative
                      endeavors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-forest-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-forest-700 mb-1">
                      Thoughts & Reflections
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Musings on life, culture, and the world around us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-forest-800 mb-4">
              Let's Connect
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              I believe in the power of community and conversation. Whether you
              want to discuss an article, share your thoughts, or just say
              hello, I'd love to hear from you!
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="https://www.linkedin.com/in/sumanth-hegde-37805a2b9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/SumanthBHegde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-300"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/Hebhsum"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors duration-300"
              >
                <FaSquareXTwitter className="w-5 h-5" />
                <span>X (Twitter)</span>
              </a>
              <a
                href="https://www.instagram.com/sumanth_hutgar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors duration-300"
              >
                <FaSquareInstagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </div>

            <p className="text-slate-600 text-sm">
              Or drop me an email at{" "}
              <a
                href="mailto:sumanthhegde002@gmail.com"
                className="text-forest-600 hover:text-forest-700 font-medium underline"
              >
                sumanthhegde002@gmail.com
              </a>
            </p>
          </div>

          {/* Closing Note */}
          <div className="text-center bg-forest-800 text-white rounded-2xl shadow-lg p-8">
            <p className="text-lg leading-relaxed">
              Thank you for visiting Bhāga. I hope you find something here that
              resonates with you, inspires you, or simply makes you think. Happy
              reading! ✨
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
