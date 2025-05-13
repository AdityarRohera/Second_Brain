// import React from 'react'
import { LuShare2 } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

interface CardType {
  title : string,
  link : string,
  tags : string,
  type : "twitter" | "youtube"
  date : string
}

function Card({title , link , type , tags , date} : CardType) {
  return (
    <div className="flex flex-col gap-8 border border-gray-300 w-[360px] h-[400] p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:scale-[1.01] hover:border-blue-300">

  {/* Top Navigation */}
  <div className="flex justify-between items-center text-lg font-semibold">

    <div className="flex gap-3 items-center w-[70%]">
      <LuShare2 className="text-gray-400" />
      <p className="truncate">{title}</p>
    </div>

    <div className="flex gap-4 justify-end items-center w-[30%] text-gray-400">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <LuShare2 className="hover:text-blue-500 cursor-pointer" />
      </a>
      <RiDeleteBinLine className="hover:text-red-500 cursor-pointer" />
    </div>

  </div>

  {/* Content */}
<div className="bg-gray-100 w-full flex flex-col justify-center items-center rounded-xl overflow-hidden">

  {/* YouTube Embed */}
  {type === "youtube" && (
    <div className="w-full relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src={link.replace("/watch?v=", "/embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )}

  {/* Twitter Embed */}
  {type === "twitter" && (
    <div className="w-full p-2">
      <blockquote className="twitter-tweet w-full">
        <a href={link}></a>
      </blockquote>
    </div>
  )}

</div>



  {/* Tags */}
  <span className="text-sm text-blue-700 bg-gray-200 rounded-full px-3 py-1 w-fit">
    {tags}
  </span>

  {/* Date */}
  <div className="text-gray-400 text-sm font-medium">
    {`Added on ${date}`}
  </div>

</div>
  )
}

export default Card;
