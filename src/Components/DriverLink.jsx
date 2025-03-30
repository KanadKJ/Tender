import React from "react";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
export default function DriverLink({ src, name, to, comp }) {
  return (
    <Link
      to={`/${to}`}
      className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
    >
      <span>
        {name === "Tender Management" ||
        name === "Home" ||
        name === "Pricing" ||
        name === "Tenders" ? (
          comp
        ) : (
          <img src={src} />
        )}
      </span>
      <span className="text-[#565656] font-normal text-base">{name}</span>
    </Link>
  );
}
