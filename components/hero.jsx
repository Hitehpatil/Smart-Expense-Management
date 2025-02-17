"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useRef } from "react";


const HeroSection = () => {
   const  imageRef = useRef();

 useEffect (() =>{
 const imageElement = imageRef.current;
 const handleScroll = (()=>{
  const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
         if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
 })
window.addEventListener("scroll", handleScroll);
 return () => window.removeEventListener("scroll", handleScroll);
 } , [])



  return (
    <div className="pb-20 px-4">
      <div  className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
        Manage Your Finance <br /> with AI Intelligence
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis architecto, ab excepturi eius alias obcaecati?</p>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">Get Started</Button>
        </Link>
        <Link href="/demo">
          <Button size="lg" variant="outline" className="px-8">Watch Demo</Button>
        </Link>
      </div>
      
      {/* //image */}
      <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image">
            <Image
             src="/banner.jpg"
          width={1280}
          height={720}
          alt="preview"
          className="rounded-lg shadow-2xl border"
          priority
            />
        </div>
      </div>
    </div>
  );
};

export default HeroSection; // ✅ Correct default export
