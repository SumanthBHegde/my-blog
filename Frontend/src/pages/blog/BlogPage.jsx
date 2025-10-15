import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/Errormessage";
import ArticleCard from "../../components/Articlecard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import BreadCrumbs from "../../components/BreadCrumbs";

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([...searchParams]);

  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
  ];

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="container flex flex-col px-5 py-10 mx-auto">
        <BreadCrumbs data={breadCrumbsData} />
        <Search
          className="w-full max-w-xl my-10"
          onSearchKeyword={handleSearch}
        />
        <div className="flex flex-wrap pb-10 md:gap-x-5 gap-y-5">
          {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
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
        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPage;
