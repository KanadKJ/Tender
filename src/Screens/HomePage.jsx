import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Background from "../Components/Background";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import gradiant from "../Assets/GradientSection.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselResponsive } from "../Utils/CommonUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import tm from "../Assets/testimonial.png";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
export default function HomePage() {
  const { userData } = useSelector((s) => s.auth);
  const carouselRef = useRef(null);
  const CustomButtonGroup = ({ next, previous }) => (
    <div className="hidden absolute top-1/2 w-full md:flex justify-between px-8 md:px-12 lg:px-16 -translate-y-1/2 mt-8">
      <button
        onClick={() => carouselRef.current?.previous()}
        className="p-3 rounded-full shadow-lg  translate-x-32"
      >
        <ArrowBackIcon />
      </button>
      <button
        onClick={() => carouselRef.current?.next()}
        className=" p-3 rounded-full shadow-lg  -translate-x-32"
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
  return (
    <div className="mt-36 mb-10 z-40 ">
      <Background type={"default"} show={"yes"} isHome="yes" />
      <div className="flex justify-center items-center px-6 md:px-12 lg:px-24 xl:px-32 ">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-3/4">
            <h1 className="font-extrabold text-5xl flex-1 text-center text-wrap">
              <span className="text-[#0554F2]">Tender</span> Sourcing Platform
              for Contractors in<span> </span>
              <span className="text-[#0554F2]">West Bengal</span>
            </h1>
          </div>
          <div className="text-2xl text-[#565656] flex-1 text-center text-wrap">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna ali
            </p>
          </div>
          <div className="w-3/4 flex  mt-4  justify-center items-center flex-col md:flex-row">
            <div className="w-full flex justify-center items-center ">
              <span className="relative left-9 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#999999"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </span>
              <input
                type="text"
                className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none w-full max-w-[30rem] px-2 py-3.5 pl-11 rounded-md"
                placeholder="Search"
              />
            </div>
            <div>
              <Autocomplete
                disablePortal
                loading
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    padding: "0.4rem", // Padding inside the input field
                    "& fieldset": {
                      borderColor: "#276BF2", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#276BF2", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#276BF2", // Border color when focused
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#276BF2", // Text color
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Indian Tenders"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#276BF2", // Input text color
                        fontWeight: 500,
                        "& fieldset": {
                          borderColor: "#276BF2", // Default border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#276BF2", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#276BF2", // Border color when focused
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#276BF2", // Text color inside input
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root": {
                        color: "#276BF2", // Label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#276BF2", // Label color when focused
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${gradiant})`, // Corrected syntax
          backgroundSize: "cover", // Ensures it covers the area
          backgroundRepeat: "no-repeat", // Prevents repeating
          backgroundPosition: "center",
          objectFit: "contain",
        }}
        className="lg:mt-64 min-h-full bg-slate-500 relative top-10 text-white px-6 md:px-12 lg:px-24 xl:px-32"
      >
        <div className="w-full flex flex-col gap-8">
          <div className="w-full  mt-16 flex justify-center items-center">
            <h1 className="font-semibold text-2xl uppercase">
              Our Achivements
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <div
              className="relative flex flex-col justify-center  bg-gradient-to-br from-white/30 to-transparent 
rounded-2xl border border-white/30 text-center  w-72 sm:w-52 lg:w-72 h-32"
            >
              {/* Upper-left Fading Shadow */}
              <div
                className="absolute top-0 left-0 w-full h-full 
  bg-transparent rounded-2xl 
  shadow-[-1px_-1px_2px_rgba(255,255,255,0.5)] pointer-events-none"
              ></div>

              {/* Number */}
              <h1 className="relative text-4xl font-bold text-white">87%</h1>

              {/* Description */}
              <p className="relative font-normal text-base text-white/80">
                tender purchase growth
              </p>
            </div>
            <div
              className="relative flex flex-col justify-center gap-1 bg-gradient-to-br from-white/30 to-transparent 
rounded-2xl border border-white/30 text-center w-72 sm:w-52 lg:w-72 h-36"
            >
              {/* Upper-left Fading Shadow */}
              <div
                className="absolute top-0 left-0 w-full h-full 
  bg-transparent rounded-2xl 
  shadow-[-1px_-1px_2px_rgba(255,255,255,0.5)] pointer-events-none"
              ></div>

              {/* Number */}
              <h1 className="relative text-5xl  font-bold text-white">450k+</h1>

              {/* Description */}
              <p className="relative font-normal text-lg text-white/80">
                number of active tenders
              </p>
            </div>
            <div
              className="relative flex flex-col justify-center  bg-gradient-to-br from-white/30 to-transparent 
rounded-2xl border border-white/30 text-center w-72 sm:w-52 lg:w-72 h-32"
            >
              {/* Upper-left Fading Shadow */}
              <div
                className="absolute top-0 left-0 w-full h-full 
  bg-transparent rounded-2xl 
  shadow-[-1px_-1px_2px_rgba(255,255,255,0.5)] pointer-events-none"
              ></div>

              {/* Number */}
              <h1 className="relative text-4xl font-bold text-white">9/10</h1>

              {/* Description */}
              <p className="relative font-normal text-base text-white/80">
                customer satisfaction score
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="w-full ">
            <h1 className="text-4xl font-semibold w-full flex flex-col gap-3 md:gap-6">
              <span>Take a demo & get a </span>
              <span>guided walkthrough with a </span>
              <span>platform expert</span>
            </h1>
          </div>
          <div className="w-full flex flex-col gap-8 my-16">
            <div className="relative pb-4 flex justify-center md:justify-end items-center gap-1">
              <h1 className="text-xl text-right font-semibold">
                Keyword & Category Searches
              </h1>
              <div className="absolute bottom-0 right-0 w-full md:w-3/4  h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
            <div className="relative pb-4 flex justify-center md:justify-end items-center gap-1">
              <h1 className="text-xl text-right font-semibold ">
                Alerts on Email, SMS & WhatsApp
              </h1>
              <div className="absolute bottom-0 right-0 w-full  h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
            <div className="relative pb-4 flex justify-center md:justify-end items-center gap-1">
              <h1 className="text-xl text-right font-semibold">
                Tender Document Downloads
              </h1>
              <div className="absolute bottom-0 right-0 w-full md:w-3/4 h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  grid grid-cols-2 md:grid-cols-4  gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-32">
        <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
          <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
            <ArticleOutlinedIcon
              sx={{
                height: 25,
                width: 25,
              }}
            />
          </span>
          <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
            Get Documents Easily
          </h6>
          <p className="text-sm font-normal text-[#565656] text-center max-w-64">
            Download all the documents like Tender notice, NIT, BOQ etc
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
          <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
            <NotificationsActiveOutlinedIcon
              sx={{
                height: 25,
                width: 25,
              }}
            />
          </span>
          <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
            Get notified for changes
          </h6>
          <p className="text-sm font-normal text-[#565656] text-center max-w-64">
            Download all the documents like Tender notice, NIT, BOQ etc
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
          <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
            <SettingsSuggestOutlinedIcon
              sx={{
                height: 25,
                width: 25,
              }}
            />
          </span>
          <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
            Automate your search
          </h6>
          <p className="text-sm font-normal text-[#565656] text-center max-w-64">
            Download all the documents like Tender notice, NIT, BOQ etc
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
          <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
            <SearchOutlinedIcon
              sx={{
                height: 25,
                width: 25,
              }}
            />
          </span>
          <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
            Search easily like Google
          </h6>
          <p className="text-sm font-normal text-[#565656] text-center max-w-64">
            Download all the documents like Tender notice, NIT, BOQ etc
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-center text-4xl font-normal text-black">
          Explore by Keywords
        </h1>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ArticleOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Get Documents Easily
            </h6>
            <p className="text-sm font-normal text-[#565656] text-center max-w-64">
              Download all the documents like Tender notice, NIT, BOQ etc
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-center text-4xl font-normal text-black">
          Tender by Categories
        </h1>
        <div className="w-full grid grid-cols-2 md:grid-cols-5 justify-center gap-4 ">
          <div className="flex flex-col justify-center items-center gap-1 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <AccountBalanceOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Tender by Sector
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <SearchOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Tender by Keyword
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <CurrencyRupeeOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Tender by Financiers
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <StarBorderRoundedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Tender by Authority
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 p-4 border rounded-lg">
            <span className="p-2.5 rounded-full text-[#0554F2] shadow-[0px_0px_16px_-6px_rgba(0,0,0,1.0)]">
              <ApartmentOutlinedIcon
                sx={{
                  height: 25,
                  width: 25,
                }}
              />
            </span>
            <h6 className="text-base text-[#212121] text-center font-semibold mt-3">
              Tender by City
            </h6>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-center text-4xl font-normal text-black">
          Guaranteed Value for Money Plans
        </h1>
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-xl font-normal">
              No Key Restriction
            </h1>
          </div>
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-xl font-normal">
              3 Days Free Trial for New Year
            </h1>
          </div>
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-xl font-normal">
              No Credit Card Required
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-4xl font-normal text-center mb-8 text-[#212121]">
          Testimonials
        </h1>
        <CustomButtonGroup />

        <Carousel
          ref={carouselRef}
          responsive={carouselResponsive}
          infinite
          autoPlay={false}
          containerClass="w-full rounded-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto shadow-md m-5"
          arrows={false}
        >
          <div className="h-auto rounded-xl flex flex-col gap-4 md:flex-row">
            <img
              src={tm}
              alt="testimonial"
              className="h-72 object-cover rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl"
            />
            <div className="flex flex-col gap-4 pr-3 pt-2 pl-2 pb-2 md:pb-0">
              <p className="text-justify text-base text-[#565656] font-normal">
                I've been using the Runway tender platform for some time now,
                and it has proven to be an invaluable resource. The platform
                delivers the latest tenders right to my dashboard as soon as
                they are released, ensuring I never miss out on an opportunity.
                Additionally, the detailed and accurate pricing for the
                materials they offer helps me plan and budget effectively,
                giving me the confidence to make well-informed decisions every
                time.
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">Tej Pratap Singh</span>
                <span className="text-sm font-normal text-[#565656]">
                  Runway Tender Platform
                </span>
              </div>
            </div>
          </div>
          <div className="h-auto rounded-xl flex flex-col gap-4 md:flex-row">
            <img
              src={tm}
              alt="testimonial"
              className="h-72  rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl"
            />
            <div className="flex flex-col gap-4 pr-3 pt-2 pl-2 pb-2 md:pb-0">
              <p className="text-justify text-base text-[#565656] font-normal">
                I've been using the Runway tender platform for some time now,
                and it has proven to be an invaluable resource. The platform
                delivers the latest tenders right to my dashboard as soon as
                they are released, ensuring I never miss out on an opportunity.
                Additionally, the detailed and accurate pricing for the
                materials they offer helps me plan and budget effectively,
                giving me the confidence to make well-informed decisions every
                time.
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">Tej Pratap Singh</span>
                <span className="text-sm font-normal text-[#565656]">
                  Runway Tender Platform
                </span>
              </div>
            </div>
          </div>
          <div className="h-auto rounded-xl flex flex-col gap-4 md:flex-row">
            <img
              src={tm}
              alt="testimonial"
              className="h-72  rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl"
            />
            <div className="flex flex-col gap-4 pr-3 pt-2 pl-2 pb-2 md:pb-0">
              <p className="text-justify text-base text-[#565656] font-normal">
                I've been using the Runway tender platform for some time now,
                and it has proven to be an invaluable resource. The platform
                delivers the latest tenders right to my dashboard as soon as
                they are released, ensuring I never miss out on an opportunity.
                Additionally, the detailed and accurate pricing for the
                materials they offer helps me plan and budget effectively,
                giving me the confidence to make well-informed decisions every
                time.
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">Tej Pratap Singh</span>
                <span className="text-sm font-normal text-[#565656]">
                  Runway Tender Platform
                </span>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="w-full gap-8 flex flex-col md:flex-row items-center relative px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 mt-16">
        <div className="w-full">
          <h1 className="flex flex-col text-4xl font-normal">
            <span>Frequently Asked</span> <span>Questions </span>
          </h1>
        </div>
        <div className="w-full">
          <div className="p-3 border-t border-gray-300">
            <Accordion disableGutters={true} sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h1 className="text-base font-normal text-[#212121]">
                  What is a tender and how does it work?
                </h1>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="p-3 border-t border-gray-300">
            <Accordion disableGutters={true} sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h1 className="text-base font-normal text-[#212121]">
                  What is a tender sourcing platform?
                </h1>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="p-3 border-t border-gray-300">
            <Accordion disableGutters={true} sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h1 className="text-base font-normal text-[#212121]">
                  What are the 4 pillars of sourcing?
                </h1>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="p-3 border-t border-gray-300">
            <Accordion disableGutters={true} sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h1 className="text-base font-normal text-[#212121]">
                  How to apply for a tender?
                </h1>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="p-3 border-t border-gray-300">
            <Accordion disableGutters={true} sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h1 className="text-base font-normal text-[#212121]">
                  Is there a free trial available?
                </h1>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
