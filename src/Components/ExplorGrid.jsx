import React from "react";

export default function ExplorGrid({ title, pic }) {
  return (
    <div
      style={{
        backgroundImage: `url(${pic})`, // Corrected syntax
        backgroundSize: "cover", // Ensures it covers the area
        backgroundRepeat: "no-repeat", // Prevents repeating
        backgroundPosition: "center",
        objectFit: "contain",
      }}
      className="flex flex-col justify-end items-center border rounded-lg h-60 max-h-60"
    >
      <div className="flex flex-col gap-1 justify-center items-center p-5 w-full bg-[#00000060] backdrop-blur-sm rounded-bl-lg rounded-br-lg">
        <span className="text-white">{title}</span>
      </div>
    </div>
  );
}
