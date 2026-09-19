"use client";
import React, { useState } from "react";
import { Magnifier } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Advertisement() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden px-4 sm:px-6 ">
      {/* Background Video with Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/50 ">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src="/video/interview.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="text-center z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight  text-gray-100 leading-none mb-6 transition-all duration-500 hover:text-transparent hover:[webkit-text-stroke:2px_#fff]">
          Your next role is already 
         <br />
          looking for youk
        </h1>

        <p className="text-gray-200 text-medium sm:text-lg mb-8 max-w-xl">
         Build a profile in three minutes. The matches 
         <br />
         start arriving tomorrow morning.
        </p>

        {/* Search Bar & Action Buttons */}
        {/* <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-700/60 shadow-2xl"
        >
        
          <div className="relative w-full flex items-center pl-3">
            <Magnifier className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title, skills, or keywords..."
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-gray-400 py-2"
            />
          </div>

       
          <div className="flex w-full sm:w-auto gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition duration-200"
            >
              Search
            </button>
            <a
              href="#get-started"
              className="w-full sm:w-auto text-center border border-zinc-600 hover:bg-white hover:text-black text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition duration-200 whitespace-nowrap"
            >
              Get Started
            </a>
          </div>
        </form> */}
        <div className="flex gap-4 mt-6 justify-center items-center">
           <Link href="/signup">
            <Button className="bg-white text-black px-10 py-2 rounded-xl" variant="solid">
                get started

            </Button>
           </Link>
           <Link href="/plans">
            <Button className="border-2 border-white px-10 py-2 rounded-xl" variant="outline">
                view Pricing
            </Button>
           </Link>
        </div>

      </div>
    </section>
  );
}
