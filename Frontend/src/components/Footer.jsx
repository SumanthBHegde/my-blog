import React from "react";
import { Link } from "react-router-dom";
import { images } from "../constants";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaLinkedin,
  FaGithub,
  FaHeart,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-earth-800 text-earth-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container px-5 py-10 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="inline-block">
                <img
                  src={images.logo}
                  alt="logo"
                  className="object-contain w-auto h-12 transition-all duration-300 brightness-110 contrast-125 drop-shadow-lg hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </Link>
              <p className="max-w-xs leading-relaxed text-slate-300">
                Welcome to Bhāga where I share my experiences, thoughts, and
                insights about life, technology, and creativity. Join me on this
                journey of discovery and let's learn together.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: FaSquareXTwitter,
                    href: "https://x.com/Hebhsum?t=TN0xr21VuxgXsKCFCQDnvw&s=09",
                    label: "X (Twitter)",
                  },
                  {
                    icon: FaSquareInstagram,
                    href: "https://www.instagram.com/sumanth_hutgar?utm_source=qr&igsh=MWJpODM1dmxjaWp6bw==",
                    label: "Instagram",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/in/sumanth-hegde-37805a2b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                    label: "LinkedIn",
                  },
                  {
                    icon: FaGithub,
                    href: "https://github.com/SumanthBHegde",
                    label: "GitHub",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 transition-all duration-300 bg-forest-700/50 hover:bg-forest-600 rounded-xl hover:scale-110 group"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300 text-forest-400 group-hover:text-earth-50" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Bhāga", href: "/blog" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="inline-block transition-colors duration-300 text-slate-300 hover:text-forest-400 hover:translate-x-1"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Categories</h3>
              <ul className="space-y-3">
                {[
                  { name: "Technology", href: "/blog?category=technology" },
                  { name: "Travel", href: "/blog?category=travel" },
                  { name: "Lifestyle", href: "/blog?category=lifestyle" },
                  { name: "Food", href: "/blog?category=food" },
                  { name: "Business", href: "/blog?category=business" },
                ].map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="inline-block transition-colors duration-300 text-slate-300 hover:text-forest-400 hover:translate-x-1"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-800/50">
                    <FaEnvelope className="w-4 h-4 text-forest-400" />
                  </div>
                  <a
                    href="mailto:sumanthhegde002@gmail.com"
                    className="transition-colors duration-300 text-slate-300 hover:text-forest-400"
                  >
                    sumanthhegde002@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-800/50">
                    <FaLocationDot className="w-4 h-4 text-forest-400" />
                  </div>
                  <span className="text-slate-300">Sirsi, Karnataka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-2 text-slate-400">
                <span>© {currentYear} Bhāga. Made with</span>
                <div className="flex items-center space-x-1">
                  <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>by Sumanth Hegde</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
