import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/Errormessage";
import LoadingError from "../../components/LoadingError";
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
            <div className="w-full">
              <LoadingError
                title="Unable to Load Posts"
                message="We're having trouble connecting to our server. It might be waking up from sleep mode (this takes 30-60 seconds on first load)."
                onRetry={refetch}
              />
            </div>
          ) : data?.data.length === 0 ? (
            <div className="w-full text-center py-12">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-24 h-24 mx-auto text-forest-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-forest-800 mb-2">
                  No Posts Found
                </h3>
                <p className="text-forest-600">
                  Try adjusting your search or check back later for new content!
                </p>
              </div>
            </div>
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
        {!isLoading && !isError && data?.data.length > 0 && (
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
