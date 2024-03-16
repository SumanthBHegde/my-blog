import React from "react";
import { FaFacebook, FaReddit, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter, FaTelegram } from "react-icons/fa6";

const SocialShareButton = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=698580818931667&display=popup&href=${url}`}
      >
        <FaFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaSquareXTwitter className="text-[#0A0A0A] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://t.me/share/url?url=${url}`}
      >
        <FaTelegram className="text-[#24A1DE] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaReddit className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsapp className="text-[#35d366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButton;
