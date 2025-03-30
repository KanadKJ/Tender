import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Divider } from "@mui/material";

export default function PriceContainer({ data }) {
  return (
    <div className="max-h-[452px] border border-[#212121] rounded-3xl max-w-60 p-4 flex flex-col gap-1 bg-white">
      <h6 className="text-lg font-semibold text-[#212121]">{data?.title}</h6>
      <div className="flex justify-start items-center">
        <h1 className="text-5xl font-normal text-[#212121]">{`₹${data?.price}`}</h1>
        <h6 className="text-base font-normal text-[#212121]">
          {data?.price === "0" ? "14 days" : "/ 1 Year"}
        </h6>
      </div>
      <p className="text-[#565656] text-sm font-normal">{data?.subTitle}</p>
      <button
        onClick={() => console.log(data?.title)}
        className={`gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-base font-normal text-[#0554F2] 
            hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out ${
              data?.title === "Standard" ? "mt-16 mb-6" : "my-6"
            }`}
      >
        {`Start with ${data?.title}`}
      </button>
      <Divider sx={{ color: "#212121" }} />
      <div className="mt-4">
        {data?.featurs?.map((d, i) => (
          <p key={i} className="flex gap-1 items-center">
            <span>
              <DoneIcon sx={{ color: "#747474" }} />
            </span>
            <span className="text-xs font-normal text-[#565656]">{d}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
