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
        <section className="py-8 bg-gray-50">
          {/* Main Article - Wider content area */}
          <article className="max-w-[900px] mx-auto px-6 md:px-8">
            {/* Title - Bold and engaging */}
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-forest-900 font-Roboto">
              {data?.title}
            </h1>

            {/* Categories - Site style */}
            <div className="flex gap-3 pb-6 mb-6 border-b-2 border-forest-200">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-forest-700 bg-forest-100 rounded-full hover:bg-forest-200 hover:text-forest-900 transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Featured Image - Smaller and contained */}
            <figure className="mb-10">
              <CloudinaryImage
                src={getImageUrl(data?.photo, images.samplePostImage)}
                fallback={images.samplePostImage}
                alt={data?.title}
                className="w-full max-h-[320px] md:max-h-[380px] object-cover rounded-xl shadow-md"
                maxRetries={6}
                retryDelay={2000}
              />
            </figure>

            {/* Article Body - Readable and site-styled */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-forest-900 prose-headings:font-Roboto prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:text-forest-800 prose-p:mb-6 prose-p:font-Roboto prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-strong:text-forest-900 prose-strong:font-bold prose-img:w-full prose-img:h-auto prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-forest-700 prose-code:text-forest-900 prose-code:bg-forest-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-forest-50 prose-pre:border prose-pre:border-forest-200 prose-pre:rounded-lg">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>

            {/* Tags - Site style */}
            {data?.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 py-6 my-8 border-t-2 border-b-2 border-forest-200">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer text-forest-700 bg-forest-100 hover:bg-forest-200 hover:text-forest-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Section - Site styled */}
            <div className="px-6 py-6 my-8 border bg-forest-50 rounded-xl border-forest-200">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-forest-900 font-Roboto">
                  Share this article
                </h3>
                <SocialShareButton
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(data?.title)}
                />
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-8 mt-8 border-t-2 border-forest-300">
              <CommetnsContainer
                comments={data?.comments}
                className=""
                logginedUserId={userState?.userInfo?._id}
                postSlug={slug}
              />
            </div>
          </article>

          {/* Latest Articles - Bottom of page with original styling */}
          <div className="max-w-[900px] px-6 mx-auto mt-16 md:px-8">
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
