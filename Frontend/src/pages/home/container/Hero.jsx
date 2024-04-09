import React from "react";
import { images } from "../../../constants";
import Search from "../../../components/Search";
const Hero = () => {
  return (
    <section className="container flex flex-col px-5 py-5 mx-auto lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-lest lg:max-w-[540px]">
          Read any intresting stories of your friends
        </h1>
        <p className="mt-4 text-center text-dark-light md:text-xl lg:text-left lg:text-base xl:text-xl">
          ......
        </p>
        <Search className="mt-10 lg:mt-6 xl:mt-10" />
        <div className="flex flex-col mt-4 lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="mt-2 italic font-semibold text-dark-light lg:mt-4 lg:text-sm xl:text-base">
            Popular Stories
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">
              Treking
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">
              Chemwiz
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">
              Field Visit
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img className="w-3/4" src={images.HeroImage} alt="article" />
      </div>
    </section>
  );
};

export default Hero;
