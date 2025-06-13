import React from "react";
import bgvector from "../Assets/BackgroundPattern.png";
import bgvectorBlank from "../Assets/bg_vector.png";
import blueBg from "../Assets/onlyBlueBg.png";
import Ribbons from "./Ribbons";
import char from "../Assets/Characters.png";
import { motion } from "framer-motion";
export default function Background({ type, lifed, show, isHome }) {
  const bg = {
    default: bgvector,
    empty: blueBg,
    vector: bgvectorBlank,
  };
  return (
    <div className="absolute top-0 left-0 h-full w-full -z-10 ">
      {isHome === "yes" && (
        <>
          <div className="w-full flex justify-center items-center absolute top-[680px]">
            <motion.img
              initial={{
                right: 500,
              }}
              animate={{
                right: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              src={char}
              alt="illLeft"
              className="h-60 md:h-90 lg:h-96 flex md:hidden"
            />
          </div>
        </>
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
              ? "absolute top-[550px] mt-28 z-50 w-full overflow-x-clip"
              : "top-[90%] absolute z-50 w-full overflow-x-clip"
          }
        >
          <Ribbons />
        </div>
      )}
    </div>
  );
}
