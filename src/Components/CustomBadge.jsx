import React from "react";

export default function CustomBadge({ data }) {
  if (!data?.length) return null;
  return (
    <span className="ml-2 font-bold bg-white rounded-full w-5 h-5 text-[#0554f2] text-center flex justify-center items-center">
      {data?.length ? `${data?.length}` : null}
    </span>
  );
}
