import React from "react";
import bgvector from "../Assets/BackgroundPattern.png";
import bgvectorBlank from "../Assets/bg_vector.png";
import blueBg from "../Assets/onlyBlueBg.png";
export default function Background({ type, lifed }) {
  const bg = {
    default: bgvector,
    empty: blueBg,
    vector: bgvectorBlank,
  };
  return (
    <div className="absolute top-0 left-0 h-full w-full -z-10 ">
      <img
        className={
          lifed === "up"
            ? "absolute top-[-100px]"
            : "h-full w-full object-cover"
        }
        src={bg[type]}
        alt="background"
      />
    </div>
  );
}
