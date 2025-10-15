import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAllPosts } from "../../../services/index/posts";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/Errormessage";
import ArticleCard from "../../../components/Articlecard";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="container flex flex-col px-5 py-10 mx-auto">
      <div className="flex flex-wrap pb-10 md:gap-x-5 gap-y-5">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
          data?.data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        )}
      </div>
      <Link
        to="/blog"
        className="group flex items-center px-6 py-3 mx-auto font-bold border-2 rounded-lg gap-x-2 text-forest-700 border-forest-300 hover:bg-forest-600 hover:text-white hover:border-forest-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
};

export default Articles;
