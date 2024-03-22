import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Components
import SuggestedPosts from "./container/SuggestedPosts";
import CommetnsContainer from "../../components/comments/CommetnsContainer";
import SocialShareButton from "../../components/SocialShareButton";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { getSinglePost } from "../../services/index/posts";
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

const postsData = [
  {
    _id: "1",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2024-02-09T12:00:00Z",
  },
  {
    _id: "2",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2024-02-09T12:00:00Z",
  },
  {
    _id: "3",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2024-02-09T12:00:00Z",
  },
  {
    _id: "4",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2024-02-09T12:00:00Z",
  },
];

const tagsData = [
  "Medical",
  "Storytelling",
  "Personal Narrative",
  "Memoir",
  "Life Experiences",
  "Inspiration",
  "Life Lessons",
  "Reflection",
  "Adventure",
  "Journey",
  "Self-Discovery",
  "Emotional",
  "True Stories",
  "Anecdotes",
  "Share Your Story",
  "Narrative",
  "Heartwarming",
  "Education",
];

function ArticleDetailPage() {
  const { slug } = useParams();
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

            <CommetnsContainer className="mt-10" LogginedUserId="a" />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData}
              tags={tagsData}
              className="mt-8 lg:mt-0 lg:max-w-xs lg:ml-5 lg:mr-5"
            />
            <div className="mt-7">
              <h2 className="mb-4 font-medium font-Roboto text-dark-hard md:text-xl">
                Share on
              </h2>
              <SocialShareButton
                url={encodeURI("url")}
                title={encodeURIComponent("Check")}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

export default ArticleDetailPage;
