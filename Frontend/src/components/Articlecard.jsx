import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCheckLg, BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { images } from "../constants";
import CloudinaryImage from "./CloudinaryImage";
import { getImageUrl } from "../utils/imageUtils";

const Articlecard = ({ post, className }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLikeClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking like button
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-forest-200/30 hover:border-forest-300/50 ${className}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/blog/${post.slug}`}>
          <CloudinaryImage
            src={getImageUrl(post.photo, images.samplePostImage)}
            fallback={images.samplePostImage}
            alt={post.title}
            className="object-cover object-center w-full h-48 md:h-56 lg:h-48 xl:h-60 group-hover:scale-110 transition-transform duration-700"
            maxRetries={6}
            retryDelay={2000}
          />
        </Link>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
          <div className="text-center">
            <span className="block text-lg font-bold text-forest-800">
              {new Date(post.createdAt).getDate()}
            </span>
            <span className="text-xs font-medium text-forest-600 uppercase tracking-wide">
              {new Date(post.createdAt).toLocaleString("default", {
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <Link
          to={`/blog/${post.slug}`}
          className="block group-hover:text-forest-600 transition-colors duration-300"
        >
          <h2 className="font-bold text-xl md:text-2xl text-forest-900 mb-3 leading-tight group-hover:text-forest-700 truncate">
            {post.title.length > 60
              ? post.title.substring(0, 60) + "..."
              : post.title}
          </h2>
          <p className="text-forest-700 text-sm md:text-base leading-relaxed">
            {post.caption.length > 120
              ? post.caption.substring(0, 120) + "..."
              : post.caption}
          </p>
        </Link>

        {/* Author Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <CloudinaryImage
              src={getImageUrl(post.user.avatar, images.userImage)}
              fallback={images.userImage}
              alt={post.user.name}
              className="rounded-full w-10 h-10 md:w-12 md:h-12 ring-2 ring-forest-200 group-hover:ring-forest-300 transition-all duration-300"
              maxRetries={4}
              retryDelay={1500}
            />
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-forest-900 group-hover:text-forest-700 transition-colors duration-200">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    post.user.verified
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-3 h-3" />
                  ) : (
                    <AiOutlineClose className="w-3 h-3" />
                  )}
                  {post.user.verified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>

          {/* Like Button & Read Time */}
          <div className="flex items-center gap-3">
            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                isLiked
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-forest-50 text-forest-600 border border-forest-200 hover:bg-forest-100"
              }`}
            >
              {isLiked ? (
                <BsHeartFill className="w-4 h-4" />
              ) : (
                <BsHeart className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            {/* Read Time */}
            <div className="flex items-center gap-1 text-forest-600 bg-forest-50 px-3 py-2 rounded-xl border border-forest-200">
              <span className="text-sm font-medium">5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Articlecard;
