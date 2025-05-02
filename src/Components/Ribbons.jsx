import React from "react";
import { motion } from "framer-motion";
export default function Ribbons() {
  return (
    <div className="hidden lg:flex flex-col relative top-[-180px] mt-8 z-[-10] bg-transparent">
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: "100%",
        }}
        className="w-full shadow-md flex justify-center items-center gap-2  transform rotate-6 bg-white"
      >
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
      </motion.div>
      <motion.div 
      initial={{
        width: "0%",
      }}
      animate={{
        width: "100%",
      }}
      className="w-full shadow-lg flex justify-center items-center gap-2  transform -rotate-[4deg] bg-white">
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>

        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium flex gap-4">
          <span>Tender</span> <span>Sourcing</span>
        </span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
        <span className="text-[#276BF2] font-medium">Tender</span>
        <span className="text-[#276BF2] font-medium text-[40px]">•</span>
      </motion.div>
    </div>
  );
}
