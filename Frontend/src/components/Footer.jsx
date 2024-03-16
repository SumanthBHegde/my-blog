import React from 'react'
import {images} from "../constants";
import { FaSquareXTwitter, FaSquareInstagram, FaTelegram, FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg ">Product</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-sm">
            <li>
              <a href="/">Landing Page</a>
            </li>
            <li>
              <a href="/">Features</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Referal Programs</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg ">Services</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-sm">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Design</a>
            </li>
            <li>
              <a href="/">Themes</a>
            </li>
            <li>
              <a href="/">Illustrations</a>
            </li>
            <li>
              <a href="/">UI Kit</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="text-dark-light font-bold md:text-lg ">Company</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-sm">
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Terms</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg ">More</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-sm">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Licence</a>
            </li>
            <li>
              <a href="/">Change Log</a>
            </li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img src={images.logo} alt="logo" className="mx-auto md:mx-0"/>
          <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base">ನುಡಿದಂತೆ ನಡೆದಿದ್ದೇವೆ</p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <FaSquareXTwitter className="w-6 h-auto"/>
              </a>
            </li>
            <li>
              <a href="/">
                <FaSquareInstagram className="w-6 h-auto"/>
              </a>
            </li>
            <li>
              <a href="/">
                <FaTelegram className="w-6 h-auto"/>
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
          <div className="bg-primary text-white p-3 rounded-full">
            <FaHeart className="w-7 h-auto"/>
          </div>
          <p className="font-bold italic text-dark-light"> Copyright © 2023. Crafted with Masti.</p>
        </div>
      </footer>
    </section>
  )
}

export default Footer;
