import React from "react";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
export default function DriverLink({ src, name, to }) {
  return (
    <Link
      to={to}
      className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
    >
      <span>
        {name === "Tender Management" ? (
          <ManageAccountsIcon
            sx={{
              color: "#b2b2b3",
            }}
          />
        ) : (
          <img src={src} />
        )}
      </span>
      <span className="text-[#565656] font-normal text-base">{name}</span>
    </Link>
  );
}
