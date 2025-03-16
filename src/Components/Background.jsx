import React from "react";
import bgvector from "../Assets/BackgroundPattern.png";
import bgvectorBlank from "../Assets/bg_vector.png";
import blueBg from "../Assets/onlyBlueBg.png";
import Ribbons from "./Ribbons";
import illLeft from "../Assets/illLeft.png";
import char from "../Assets/Characters.png";
export default function Background({ type, lifed, show, isHome }) {
  console.log(show);

  const bg = {
    default: bgvector,
    empty: blueBg,
    vector: bgvectorBlank,
  };
  return (
    <div className="absolute top-0 left-0 h-full w-full -z-10 ">
      {isHome === "yes" && (
        <div className="w-full flex justify-between absolute top-0">
          <div>
            <img
              src={illLeft}
              alt="illLeft"
              className="h-96 relative -left-40"
            />
          </div>

          <div>
            <img src={char} alt="char" className="h-72" />
          </div>
        </div>
      )}
      <img
        className={
          lifed === "up"
            ? "absolute top-[-100px]"
            : "h-full w-full object-cover"
        }
        src={bg[type]}
        alt="background"
      />
      {show === "yes" && show !== undefined && (
        <div className="absolute top-[90%] z-50 w-full overflow-x-clip">
          <Ribbons />
        </div>
      )}
    </div>
  );
}
