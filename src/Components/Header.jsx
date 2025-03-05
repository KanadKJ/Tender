import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import logo from "../Assets/Logo.png";
import avtar from "../Assets/avatar.jpg";
import { useNavigate } from "react-router-dom";
const Header = () => {
  //local states
  const [userData, setUserData] = useState(false);

  //hooks
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     let data = JSON.parse(user);
  //     setUserData(data);
  //   }
  // }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux states
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  const handleSidebar = () => {
    dispatch(sibebarHandler(true));
  };
  return (
    <header className="backdrop-blur-lg z-0 h-14 md:h-16 shadow-md sm:px-1 fixed w-full  top-0 left-0 transition-shadow duration-700 bg-white/70">
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
                About Us
              </span>
            </div>
          </div>
        </div>
        {
          // auth true
          !false ? (
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
            <div className="hidden md:flex justify-center items-center gap-4">
              <img
                src={avtar}
                className="h-[30px] w-[30px] rounded-full object-covered"
              />
              <h1 className="hidden lg:flex">
                {userData?.firstName + " " + userData?.lastName}
              </h1>
            </div>
          )
        }
      </div>
    </header>
  );
};

export default Header;
