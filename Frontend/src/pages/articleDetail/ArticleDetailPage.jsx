import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

//Components
import SuggestedPosts from "./container/SuggestedPosts";
import CommetnsContainer from "../../components/comments/CommetnsContainer";
import SocialShareButton from "../../components/SocialShareButton";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { getSinglePost, getAllPosts } from "../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/Errormessage";

//tiptap
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";

function ArticleDetailPage() {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:gap-x-10 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="w-full rounded-xl"
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.samplePostImage
              }
              alt={data?.title}
            />
            <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="inline-block text-sm text-primary font-roboto md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-Roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="mt-4 prose-sm prose sm:prose-base">{body}</div>
            <CommetnsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs lg:ml-5 lg:mr-5"
            />
            <div className="mt-7">
              <h2 className="mb-4 font-medium font-Roboto text-dark-hard md:text-xl">
                Share on
              </h2>
              <SocialShareButton
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

export default ArticleDetailPage;
