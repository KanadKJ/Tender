import { useDispatch, useSelector } from "react-redux";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import logo from "../Assets/logoNew.png";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { Avatar, Dialog, Popover } from "@mui/material";
import {
  GetUserDetails,
  logout,
  LogoutUser,
  setData,
} from "../Redux/Slices/AuthSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { cleanUpUserFilters } from "../Redux/Slices/TenderSlice";
import { getDecryptedItem } from "../Utils/CommonUtils";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sessionInControlStatus, setSessionInControlStatus] = useState(false);
  const { userData, userFilters } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redux states
  const { isSidebarOpen } = useSelector((state) => state.common);
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }

    if (localStorage.getItem("sessionInControl")) {
      console.log("session is in admins control");
      setSessionInControlStatus(true);
    } else {
      setSessionInControlStatus(false);
    }
  }, [userData, userFilters]);
  const handleSidebar = () => {
    dispatch(sibebarHandler(true));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    const encryptedData = localStorage.getItem("controller");
    if (encryptedData) {
      const decrypted = getDecryptedItem(encryptedData);
      console.log("Decrypted Data:", decrypted);
      dispatch(GetUserDetails(JSON.parse(decrypted)));
      localStorage.removeItem("sessionInControl");
      setSessionInControlStatus(false);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <header className="backdrop-blur-lg z-10  shadow-md sm:px-1 fixed w-full  top-0 left-0 transition-shadow duration-700 bg-white/70">
      {sessionInControlStatus && (
        <div className="flex justify-end bg-yellow-300 text-black-500 rounded-lg mt-1 ">
          <div className="col-span-1 flex gap-4 px-4 py-1">
            <span className="text-sm">
              You are logged in as :{" "}
              <span className="font-semibold">{userData?.firstName}</span>
            </span>
            <button
              onClick={handleGoBack}
              className="px-2 text-sm bg-yellow-100 rounded-md "
            >
              Go back
            </button>
          </div>
        </div>
      )}
      <div className="flex h-full flex-row items-center px-4">
        <div className="text-lg font-bold text-gray-800">
          <div className="flex justify-between items-center gap-2">
            <button className="md:hidden p-2 rounded" onClick={handleSidebar}>
              {!isSidebarOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#999999"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              )}
            </button>

            <div
              className="flex flex-col cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="Logo" className=" h-[40px] md:h-[60px]" />
            </div>
          </div>
        </div>

        <div className="flex-grow justify-center flex ">
          <div className="hidden md:flex">
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs">
              <span
                className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0"
                onClick={() => navigate("/")}
              >
                <span>
                  <HomeOutlinedIcon
                    sx={{
                      height: 20,
                    }}
                  />
                </span>
                <span>Home</span>
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
                onClick={() => navigate("/tenders?")}
              >
                <span>
                  <DescriptionOutlinedIcon
                    sx={{
                      height: 20,
                    }}
                  />
                </span>
                <span>Tenders</span>
              </span>
            </div>
            <div
              className="flex flex-col justify-center items-center mx-3 text-center text-xs "
              onClick={() => navigate("pricing")}
            >
              <span
                className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                <span>
                  <CurrencyRupeeOutlinedIcon
                    sx={{
                      height: 20,
                    }}
                  />
                </span>
                <span>Pricing</span>
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                <span>
                  <HelpOutlinedIcon
                    sx={{
                      height: 20,
                    }}
                  />
                </span>
                <span>Help for Bid Submission</span>
              </span>
            </div>
            <div
              className="flex flex-col justify-center items-center mx-3 text-center text-xs "
              onClick={() => navigate("About-Us")}
            >
              <span
                className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                <span>
                  <InfoOutlinedIcon
                    sx={{
                      height: 20,
                    }}
                  />
                </span>
                <span>About Us</span>
              </span>
            </div>
            {userData && (
              <div
                className="flex flex-col justify-center items-center mx-3 text-center text-xs "
                onClick={() => navigate("/dashboard")}
              >
                <span
                  className="text-[#212121] pb-1 text-sm font-normal hover:text-[#0554F2] relative flex items-center rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
                >
                  <span>
                    <PersonOutlineOutlinedIcon
                      sx={{
                        height: 20,
                      }}
                    />
                  </span>
                  <span>Profile</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {
          // auth true
          !userData ? (
            <div className="cursor-pointer">
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                  hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
              >
                Log In
              </button>
            </div>
          ) : (
            <>
              <div
                className="hidden md:flex justify-center items-center gap-4 cursor-pointer"
                onClick={handleClick}
              >
                <PersonOutlineOutlinedIcon />
                <h1 className="hidden lg:flex">
                  {userData?.firstName + " " + userData?.lastName}
                </h1>
              </div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                sx={{
                  borderRadius: "25px",
                }}
                disableScrollLock
              >
                <div
                  onClick={() => {
                    navigate("/dashboard");
                    handleClose();
                  }}
                  className="cursor-pointer p-4 w-full flex flex-col justify-center items-center min-w-56"
                >
                  <Avatar
                    sx={{
                      bgcolor: "#0554F2",
                      width: 80,
                      height: 80,
                      marginTop: "0.5rem",
                    }}
                  >
                    {userData?.firstName?.split(" ")[0][0]?.toUpperCase()}
                    {(userData?.firstName?.split(" ")[1]?.length &&
                      userData?.firstName?.split(" ")[1][0]?.toUpperCase()) ||
                      userData?.firstName
                        ?.split(" ")[0]
                        [
                          userData?.firstName?.split(" ")[0]?.length - 1
                        ]?.toUpperCase()}
                  </Avatar>
                  <div className="cursor-pointer mt-5">
                    <h1 className="text-2xl hover:text-[26px] font-medium text-center">
                      {userData?.firstName}
                    </h1>
                    <h6 className="text-xs font-normal text-[#747474] text-center">
                      {userData?.email}
                    </h6>
                  </div>
                  <div className="border rounded-md p-3 mt-5">
                    <h6 className="text-xs font-semibold text-[#747474] text-center">
                      PLAN DETAILS
                    </h6>
                    <p className="p-1">
                      Valid Till :{userFilters?.ExpiryDate || ""}
                    </p>
                  </div>
                  <button
                    className="p-1 mt-5 text-[#565656] flex gap-2"
                    onClick={() => {
                      dispatch(LogoutUser(userData?.id));
                      dispatch(cleanUpUserFilters());
                      navigate("/login");
                    }}
                  >
                    <LogoutIcon />
                    <span className="text-[#565656] text-sm font-semibold">
                      Logout
                    </span>
                  </button>
                </div>
              </Popover>
            </>
          )
        }
      </div>
    </header>
  );
};

export default Header;
