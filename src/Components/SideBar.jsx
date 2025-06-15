// src/components/Sidebar/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../Assets/profile.svg";

import logoutPic from "../Assets/logout.svg";
import rupee from "../Assets/rupee.svg";
import saved from "../Assets/saved.svg";
import trems from "../Assets/trems.svg";
import LoginIcon from "@mui/icons-material/Login";
import DriverLink from "./DriverLink";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, setData } from "../Redux/Slices/AuthSlice";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { Avatar, Divider } from "@mui/material";
import logo from "../Assets/logoNew.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import { cleanUpUserFilters } from "../Redux/Slices/TenderSlice";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { planNames } from "../Utils/CommonUtils";
const Sidebar = ({ onLinkClick }) => {
  const { userData, userFilters } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);

  return (
    <nav className="flex flex-col justify-start items-start max-w-[250px] w-full mt-2 rounded-md h-screen mb-5 overflow-y-scroll md:overflow-hidden md:sticky">
      <ul
        className="w-full flex flex-col gap-2 md:hidden"
        onClick={() => dispatch(sibebarHandler(false))}
      >
        <div className="flex justify-between items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="Logo" className=" h-[60px] w-[120px]" />
          </div>
          <button>
            <CancelOutlinedIcon />
          </button>
        </div>
        {userData &&<Divider variant="fullWidth" />}
        {userData && (
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="cursor-pointer p-2 w-full flex flex-col justify-center items-center min-w-60"
          >
            <div className="cursor-pointer">
              <h1 className="text-xl font-medium text-center">
                {userData?.firstName}
              </h1>
              <h6 className="text-xs font-normal text-[#747474] text-center">
                {userData?.email}
              </h6>
            </div>
            <div className="w-full border rounded-md p-3 mt-2">
              <h6 className="text-xs font-semibold text-[#747474] text-center">
                PLAN DETAILS
              </h6>
              <p className="p-1 text-sm">
                Plan Name : {planNames[userData?.packageId - 1]}
              </p>
              <p className="p-1 text-sm">
                Valid Till : {userFilters?.ExpiryDate || ""}
              </p>
            </div>
          </div>
        )}
        <Divider variant="fullWidth" />
        <DriverLink
          comp={
            <HomeOutlinedIcon
              sx={{
                color: "#b2b2b3",
              }}
            />
          }
          name="Home"
          to=""
        />
        <DriverLink
          comp={
            <DescriptionOutlinedIcon
              sx={{
                color: "#b2b2b3",
              }}
            />
          }
          name="Tenders"
          to="tenders"
        />
        <DriverLink
          comp={
            <CurrencyRupeeOutlinedIcon
              sx={{
                color: "#b2b2b3",
              }}
            />
          }
          name="Pricing"
          to="pricing"
        />
        <button
          onClick={() => navigate("/T&C")}
          className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
        >
          <span>
            <img src={trems} />
          </span>
          <span className="text-[#565656] font-normal text-sm">
            Terms & Conditions
          </span>
        </button>
        <Divider variant="fullWidth" />
      </ul>
      {userData ? (
        <ul
          className="w-full flex flex-col gap-2 mb-8"
          onClick={() => dispatch(sibebarHandler(false))}
        >
          <DriverLink src={profile} name="Profile" to="dashboard/profile" />
          <DriverLink
            src={rupee}
            name="Payment History"
            to="dashboard/payment-history"
          />

          <DriverLink
            src={saved}
            name="Followed Tenders"
            to="dashboard/FollowTenders"
          />

          {userData?.userType === 1 && (
            <DriverLink
              comp={
                <AdminPanelSettingsIcon
                  sx={{
                    color: "#b2b2b3",
                  }}
                />
              }
              name="Tender Management"
              to="dashboard/TenderManagement"
            />
          )}
          {userData?.userType === 1 && (
            <DriverLink
              comp={
                <ManageAccountsIcon
                  sx={{
                    color: "#b2b2b3",
                  }}
                />
              }
              name="User Management"
              to="dashboard/UserManagement"
            />
          )}
          {userData?.userType === 1 && (
            <DriverLink
              comp={
                <HelpOutlinedIcon
                  sx={{
                    color: "#b2b2b3",
                  }}
                />
              }
              name="Customer Queries"
              to="dashboard/CustomerQueries"
            />
          )}

          <Link
            onClick={() => {
              dispatch(LogoutUser(userData?.id));
              dispatch(cleanUpUserFilters());
            }}
            className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
          >
            <span>
              <img src={logoutPic} />
            </span>
            <span className="text-[#565656] font-normal text-sm">Logout</span>
          </Link>
        </ul>
      ) : (
        <ul
          className="w-full flex flex-col gap-2 mt-2"
          onClick={() => dispatch(sibebarHandler(false))}
        >
          <DriverLink
            comp={
              <LoginIcon
                sx={{
                  color: "#b2b2b3",
                }}
              />
            }
            name="Login"
            to="login"
          />
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
