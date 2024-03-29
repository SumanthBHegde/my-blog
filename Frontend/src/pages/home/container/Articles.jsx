import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Articlecard from "../../../components/Articlecard";
import { getAllPosts } from "../../../services/index/posts";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/Errormessage";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="container flex flex-wrap px-5 py-10 mx-auto md:gap-x-5 gap-y-5">
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
        data.map((post) => (
          <Articlecard
            key={post._id}
            post={post}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
          />
        ))
      )}
    </section>
  );
};

export default Articles;
