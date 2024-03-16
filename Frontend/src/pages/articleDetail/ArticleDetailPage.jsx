import React from 'react'
import MainLayout from '../../components/MainLayout';
import BreadCrumbs from '../../components/BreadCrumbs';
import { images } from '../../constants';
import { Link } from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommetnsContainer from '../../components/comments/CommetnsContainer';
import SocialShareButton from '../../components/SocialShareButton';

const breadCrumbsData = [
    {name: "Home",link: '/'},
    {name: "Blog",link: '/blog'},
    {name: "Article title",link: '/blog/1'},
];

const postsData = [
    {
        _id: "1",
        image: images.Post1Image,
        title:"Help children get better education",
        createdAt: "2024-02-09T12:00:00Z", 
    },
    {
        _id: "2",
        image: images.Post1Image,
        title:"Help children get better education",
        createdAt: "2024-02-09T12:00:00Z", 
    },
    {
        _id: "3",
        image: images.Post1Image,
        title:"Help children get better education",
        createdAt: "2024-02-09T12:00:00Z", 
    },
    {
        _id: "4",
        image: images.Post1Image,
        title:"Help children get better education",
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
  return (
    <MainLayout>
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-10 lg:items-start">
            <article className="flex-1">
                <BreadCrumbs data={breadCrumbsData}/>
                <img className="rounded-xl w-full" src={images.Post1Image} alt="article" />
                <Link to="/blog?category=selectedCategory" className=" text-primary text-sm font-Roboto inline-block mt-4 md:text-base">
                    Education
                </Link>
                <h1 className="text-xl font-medium font-Roboto mt-4 text-dark-hard md:text-[26px]">Help children get better education</h1>
                <div className="mt-4 text-dark-soft">
                    <p className="leading-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin.
                    </p>
                </div>

                <CommetnsContainer className="mt-10" LogginedUserId="a"/>
            </article>
            <div>
                <SuggestedPosts header="Latest Article" posts={postsData} tags={tagsData} className="mt-8 lg:mt-0 lg:max-w-xs lg:ml-5 lg:mr-5"/>
                <div className="mt-7">
                    <h2 className="font-Roboto font-medium text-dark-hard mb-4 md:text-xl">Share on</h2>
                    <SocialShareButton url={encodeURI(
                        "url"
                     )} title={encodeURIComponent(
                        "Check"
                     )}
                    />
                </div>
            </div>
            
        </section>
    </MainLayout>
  )
}

export default ArticleDetailPage
