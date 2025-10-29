import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

//Components
import SuggestedPosts from "./container/SuggestedPosts";
import CommetnsContainer from "../../components/comments/CommetnsContainer";
import SocialShareButton from "../../components/SocialShareButton";
import MainLayout from "../../components/MainLayout";
import CloudinaryImage from "../../components/CloudinaryImage";
import { images } from "../../constants";
import { getImageUrl } from "../../utils/imageUtils";
import { getSinglePost, getAllPosts } from "../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/Errormessage";
import Editor from "../../components/editor/Editor";

function ArticleDetailPage() {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="min-h-screen py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-forest-50/20 via-white to-earth-50/20">
          {/* Main Article */}
          <article className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold leading-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl text-forest-900">
              {data?.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 pb-4 mb-6 text-sm border-b sm:pb-6 sm:mb-8 border-forest-200 text-forest-600">
              <span>
                {new Date(data?.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>{data?.user?.name}</span>
            </div>

            {/* Categories */}
            {data?.categories && data.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {data.categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/blog?category=${category.title}`}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors border rounded-lg text-forest-700 bg-forest-50 border-forest-200 hover:bg-forest-100 hover:border-forest-300"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <figure className="mb-8 sm:mb-12">
              <CloudinaryImage
                src={getImageUrl(data?.photo, images.samplePostImage)}
                fallback={images.samplePostImage}
                alt={data?.title}
                className="w-full object-cover rounded-lg sm:rounded-xl shadow-sm max-h-[280px] sm:max-h-[360px] md:max-h-[420px]"
                maxRetries={6}
                retryDelay={2000}
              />
            </figure>

            {/* Article Body */}
            <div className="prose prose-base sm:prose-lg max-w-none prose-headings:font-bold prose-headings:text-forest-900 prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-forest-800 prose-p:mb-4 sm:prose-p:mb-6 prose-a:text-forest-600 prose-a:font-medium prose-a:underline hover:prose-a:text-forest-800 prose-a:transition-colors prose-strong:text-forest-900 prose-strong:font-semibold prose-img:w-full prose-img:rounded-lg prose-img:shadow-sm prose-blockquote:border-l-4 prose-blockquote:border-forest-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-forest-700 prose-code:text-forest-900 prose-code:bg-forest-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-forest-50 prose-pre:border prose-pre:border-forest-200 prose-pre:rounded-lg prose-pre:text-sm">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>

            {/* Tags */}
            {data?.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 py-4 my-8 border-t sm:py-6 sm:my-10 border-forest-200">
                <span className="text-sm font-medium text-forest-600">
                  Tags:
                </span>
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-full text-forest-700 bg-forest-100 hover:bg-forest-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Section */}
            <div className="p-4 my-8 transition-shadow border rounded-lg sm:p-6 sm:my-10 bg-forest-50/50 border-forest-200 hover:shadow-md">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold sm:text-base text-forest-900">
                  Share this article
                </h3>
                <SocialShareButton
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(data?.title)}
                />
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-6 mt-8 border-t sm:pt-8 sm:mt-10 border-forest-200">
              <CommetnsContainer
                comments={data?.comments}
                className=""
                logginedUserId={userState?.userInfo?._id}
                postSlug={slug}
              />
            </div>
          </article>

          {/* Latest Articles */}
          <div className="max-w-4xl px-4 mx-auto mt-12 sm:px-6 lg:px-8 sm:mt-16">
            <SuggestedPosts
              header="Latest Articles"
              posts={postsData?.data}
              tags={data?.tags}
              className="mt-8 lg:mt-0"
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
}

export default ArticleDetailPage;
