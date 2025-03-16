import React from "react";
import { useSelector } from "react-redux";
import Background from "../Components/Background";

export default function HomePage() {
  const { userData } = useSelector((s) => s.auth);

  return (
    <div className="mt-36 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40 h-screen">
      <Background type={"default"} show={"yes"} isHome="yes" />
      <div className="flex">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-3/4">
            <h1 className="font-extrabold text-5xl flex-1 text-center text-wrap">
              <span className="text-[#0554F2]">Tender</span> Sourcing Platform
              for Contractors in<span> </span>
              <span className="text-[#0554F2]">West Bengal</span>
            </h1>
          </div>
          <div className="text-2xl text-[#565656] flex-1 text-center text-wrap">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna ali
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
