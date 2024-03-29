import React from 'react';
import {FiSearch} from "react-icons/fi";
import { images } from '../../../constants';
const Hero = () => {
  return (
    <section className='container mx-auto flex flex-col px-5 py-5 lg:flex-row'>
      <div className='mt-10 lg:w-1/2'>
        <h1 className='font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-lest lg:max-w-[540px]'>
            Read any intresting stories of your friends
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-left lg:text-base xl:text-xl">
            ......
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 relative lg:mt-6 xl:mt-10">
            <div className="relative">
                <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]'/>
                <input className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] md:py-4 " type="text" placeholder="Search Story"/>
            </div>
        <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">Serach</button>  
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
            <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">Popular Stories</span>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3">
                <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">Treking</li>
                <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">Chemwiz</li>
                <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold lg:text-sm xl:text-base">Field Visit</li>
            </ul>
        </div>
      </div>
      <div className='hidden lg:block lg:1/2'>
        <img className="w-3/4" src={images.HeroImage} alt="article" />
      </div>
    </section>
  )
}

export default Hero
