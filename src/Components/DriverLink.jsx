import React from "react";
import { Link } from "react-router-dom";

export default function DriverLink({ src, name, to }) {
  return (
    <Link
      to={to}
      className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
    >
      <span>
        <img src={src} />
      </span>
      <span className="text-[#565656] font-normal text-base">{name}</span>
    </Link>
  );
}
