import React from "react";
import bgvector from "../Assets/BackgroundPattern.png";
import bgvectorBlank from "../Assets/bg_vector.png";
import blueBg from "../Assets/onlyBlueBg.png";
import Ribbons from "./Ribbons";
export default function Background({ type, lifed, show }) {
  console.log(show);

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
      {show === "yes" && show !== undefined && (
        <div className="absolute top-[90%] z-50 w-full overflow-x-clip">
          <Ribbons />
        </div>
      )}
    </div>
  );
}
