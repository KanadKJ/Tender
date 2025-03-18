import React from "react";
import bgvector from "../Assets/BackgroundPattern.png";
import bgvectorBlank from "../Assets/bg_vector.png";
import blueBg from "../Assets/onlyBlueBg.png";
import Ribbons from "./Ribbons";
import illLeft from "../Assets/illLeft.png";
import char from "../Assets/Characters.png";
export default function Background({ type, lifed, show, isHome }) {
  const bg = {
    default: bgvector,
    empty: blueBg,
    vector: bgvectorBlank,
  };
  return (
    <div className="absolute top-0 left-0 h-full w-full -z-10 ">
      {isHome === "yes" && (
        <div className="w-full flex h-auto justify-between absolute top-12">
          <div>
            <img
              src={illLeft}
              alt="illLeft"
              className="h-80 md:h-90 lg:h-96 relative -left-28 md:-left-36 lg:-left-40"
            />
          </div>

          <div>
            <img src={char} alt="char" className="h-72 mt-12" />
          </div>
        </div>
      )}
      <img
        className={
          lifed === "up"
            ? "absolute top-[-150px]"
            : "h-full w-full object-cover"
        }
        src={bg[type]}
        alt="background"
      />
      {show === "yes" && show !== undefined && (
        <div
          className={
            isHome === "yes"
              ? "absolute top-[99%] z-50 w-full overflow-x-clip"
              : "top-[90%] absolute z-50 w-full overflow-x-clip"
          }
        >
          <Ribbons />
        </div>
      )}
    </div>
  );
}
