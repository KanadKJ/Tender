import { useDispatch, useSelector } from "react-redux";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { Popover } from "@mui/material";
import { logout } from "../Redux/Slices/AuthSlice";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userData } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux states
  const { isSidebarOpen } = useSelector((state) => state.common);

  const handleSidebar = () => {
    dispatch(sibebarHandler(true));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <header className="backdrop-blur-lg z-10 h-14 md:h-16 shadow-md sm:px-1 fixed w-full  top-0 left-0 transition-shadow duration-700 bg-white/70">
      <div className="flex flex-row h-full items-center px-4">
        <div className="text-lg font-bold text-gray-800">
          <div className="flex justify-between items-center gap-5">
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

            <div className="flex flex-col w-[40px] h-[40px]">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        <div className="flex-grow justify-center flex ">
          <div className="hidden md:flex">
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs">
              <span
                className="text-[#212121] text-sm font-normal hover:text-[#0554F2] relative flex items-center space-x-3 rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0"
                onClick={() => navigate("/")}
              >
                Home
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] text-sm font-normal hover:text-[#0554F2] relative flex items-center space-x-3 rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
                onClick={() => navigate("/tenders?")}
              >
                Tenders
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] text-sm font-normal hover:text-[#0554F2] relative flex items-center space-x-3 rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                Pricing
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] text-sm font-normal hover:text-[#0554F2] relative flex items-center space-x-3 rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                Help for Bid Submission
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mx-3 text-center text-xs ">
              <span
                className="text-[#212121] text-sm font-normal hover:text-[#0554F2] relative flex items-center space-x-3 rounded-lg cursor-pointer 
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#0554F2] 
                before:transition-all before:duration-300 before:ease-in-out hover:before:w-full 
                hover:before:left-0 "
              >
                About Us
              </span>
            </div>
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
              >
                <div className="p-4 w-full flex flex-col gap-4 min-w-40">
                  <button
                    onClick={() => navigate("/profile")}
                    className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                      hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="flex flex-col gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                      hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                  >
                    <span>Plan details</span>
                    <span className="text-xs">Valid till : 01 Dec 2025</span>
                  </button>
                  <button
                    onClick={() => dispatch(logout())}
                    className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                      hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                  >
                    Logout
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
