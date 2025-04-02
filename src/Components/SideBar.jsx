// src/components/Sidebar/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logout, LogoutUser, setData } from "../Redux/Slices/AuthSlice";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { Dialog, DialogTitle, Divider } from "@mui/material";
import logo from "../Assets/logoNew.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import { cleanUpUserFilters } from "../Redux/Slices/TenderSlice";
const Sidebar = ({ onLinkClick }) => {
  const { userData } = useSelector((s) => s.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);

  const handleClose = () => {
    setOpen(false);
  };
  const openDialog = (t) => {
    setType(t);
    setOpen(true);
  };
  return (
    <nav className="flex flex-col justify-start items-start max-w-[250px] w-full  rounded-md sticky">
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
        <Divider variant="fullWidth" />
      </ul>
      <ul
        className="w-full flex flex-col gap-2"
        onClick={() => dispatch(sibebarHandler(false))}
      >
        <DriverLink src={profile} name="Profile" to="dashboard/profile" />
        <DriverLink src={rupee} name="Active Plan" to="" />

        <DriverLink src={saved} name="Followed Tenders" to="" />

        <button
          onClick={() => openDialog("PP")}
          className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
        >
          <span>
            <img src={locked} />
          </span>
          <span className="text-[#565656] font-normal text-base">
            Privacy Policy
          </span>
        </button>
        <button
          onClick={() => openDialog("TC")}
          className="w-full flex gap-2 active:text-[#0554F2] pl-2 hover:bg-[#F2F6FE] hover:shadow-md p-2 rounded-md"
        >
          <span>
            <img src={trems} />
          </span>
          <span className="text-[#565656] font-normal text-base">
            Terms & Conditions
          </span>
        </button>

        <DriverLink
          comp={
            <ManageAccountsIcon
              sx={{
                color: "#b2b2b3",
              }}
            />
          }
          name="Tender Management"
          to="dashboard/TenderManagement"
        />

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
          <span className="text-[#565656] font-normal text-base">Logout</span>
        </Link>
      </ul>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {type === "TC" ? (
          <div>
            <DialogTitle id="alert-dialog-title">
              Terms & Conditions
            </DialogTitle>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              iste totam natus aperiam ipsum dolor eos facilis quia sint fuga,
              quo eum eligendi sed veniam! Eligendi, iure perspiciatis officia
              autem ea consectetur eius quaerat provident voluptatibus doloribus
              voluptates nesciunt dicta, labore nisi expedita officiis similique
              illo fuga! Voluptate distinctio nam, similique commodi libero
              architecto obcaecati.
            </p>
          </div>
        ) : (
          <div>
            <DialogTitle id="alert-dialog-title">Privacy Policy</DialogTitle>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              iste totam natus aperiam ipsum dolor eos facilis quia sint fuga,
              quo eum eligendi sed veniam! Eligendi, iure perspiciatis officia
              autem ea consectetur eius quaerat provident voluptatibus doloribus
              voluptates nesciunt dicta, labore nisi expedita officiis similique
              illo fuga! Voluptate distinctio nam, similique commodi libero
              architecto obcaecati.
            </p>
          </div>
        )}
      </Dialog>
    </nav>
  );
};

export default Sidebar;
