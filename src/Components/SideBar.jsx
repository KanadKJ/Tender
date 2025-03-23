// src/components/Sidebar/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../Assets/profile.svg";
import download from "../Assets/download.svg";
import Enquiries from "../Assets/Enquiries.svg";
import locked from "../Assets/locked.svg";
import logoutPic from "../Assets/logout.svg";
import rupee from "../Assets/rupee.svg";
import saved from "../Assets/saved.svg";
import trems from "../Assets/trems.svg";
import viewed from "../Assets/viewed.svg";
import howdoesitworks from "../Assets/howdoesitworks.svg";
import DriverLink from "./DriverLink";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <nav className="flex justify-center items-start max-w-[250px] w-full  rounded-md sticky">
      <ul className="w-full flex flex-col gap-2">
        <DriverLink src={profile} name="Profile" to="profile" />
        <DriverLink src={rupee} name="Active Plan" to="" />
        <DriverLink src={Enquiries} name="Enquiries" to="" />
        <DriverLink src={viewed} name="Viewed Tenders" to="" />
        <DriverLink src={download} name="Downloaded Tenders" to="" />
        <DriverLink src={saved} name="Followed Tenders" to="" />
        <DriverLink src={howdoesitworks} name="How it Works" to="" />
        <DriverLink src={locked} name="Privacy Policy" to="" />
        <DriverLink src={trems} name="Terms & Conditions" to="" />
        <DriverLink
          src={trems}
          name="SystemConfigSuper"
          to="/dashboard/SystemConfigSuper"
        />

        <Link
          onClick={() => dispatch(logout())}
          className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
        >
          <span>
            <img src={logoutPic} />
          </span>
          <span className="text-[#565656] font-normal text-base">Logout</span>
        </Link>
      </ul>
    </nav>
  );
};

export default Sidebar;
