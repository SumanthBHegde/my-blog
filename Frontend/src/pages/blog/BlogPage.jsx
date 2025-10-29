import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import LoadingError from "../../components/LoadingError";
import ArticleCard from "../../components/Articlecard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import BreadCrumbs from "../../components/BreadCrumbs";

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
    queryKey: ["posts", currentPage, searchKeyword],
    onError: (error) => {
      toast.error(error.message);
    },
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, searchKeyword]);

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="min-h-screen py-6 sm:py-10 bg-gradient-to-br from-forest-50/20 via-white to-earth-50/20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <BreadCrumbs data={breadCrumbsData} />
            <h1 className="mt-4 text-2xl font-bold sm:mt-6 sm:text-3xl lg:text-4xl text-forest-900">
              Blog
            </h1>
            <p className="mt-2 text-sm sm:text-base text-forest-600">
              Discover articles, tutorials, and insights
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 sm:mb-12">
            <Search
              className="w-full max-w-2xl"
              onSearchKeyword={handleSearch}
            />
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 gap-4 pb-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading || isFetching ? (
              [...Array(6)].map((item, index) => (
                <ArticleCardSkeleton key={index} className="w-full" />
              ))
            ) : isError ? (
              <div className="col-span-full">
                <LoadingError
                  title="Unable to Load Posts"
                  message="We're having trouble connecting to our server. It might be waking up from sleep mode (this takes 30-60 seconds on first load)."
                  onRetry={refetch}
                />
              </div>
            ) : data?.data.length === 0 ? (
              <div className="py-12 text-center col-span-full">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 sm:w-24 sm:h-24 text-forest-300"
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
                  <h3 className="mb-2 text-xl font-bold sm:text-2xl text-forest-800">
                    No Posts Found
                  </h3>
                  <p className="text-sm sm:text-base text-forest-600">
                    Try adjusting your search or check back later for new
                    content!
                  </p>
                </div>
              </div>
            ) : (
              data?.data.map((post) => (
                <ArticleCard key={post._id} post={post} className="w-full" />
              ))
            )}
          </div>

          {/* Pagination */}
          {!isLoading &&
            !isError &&
            data?.data.length > 0 &&
            data?.headers?.["x-totalpagecount"] && (
              <Pagination
                onPageChange={(page) => handlePageChange(page)}
                currentPage={currentPage}
                totalPageCount={JSON.parse(data.headers["x-totalpagecount"])}
              />
            )}
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
