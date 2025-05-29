import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExplorGrid({ title, pic }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/tenders?")}
      style={{
        backgroundImage: `url(${pic})`, // Corrected syntax
        backgroundSize: "cover", // Ensures it covers the area
        backgroundRepeat: "no-repeat", // Prevents repeating
        backgroundPosition: "center",
        objectFit: "contain",
      }}
      className="flex flex-col justify-end items-center border rounded-lg h-60 max-h-60 cursor-pointer"
    >
      <div className="flex flex-col gap-1 justify-center items-center p-5 w-full bg-[#00000060] backdrop-blur-sm rounded-bl-lg rounded-br-lg">
        <span className="text-white">{title}</span>
      </div>
    </div>
  );
}
