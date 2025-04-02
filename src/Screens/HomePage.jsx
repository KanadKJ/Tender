import React, { useRef } from "react";
import Background from "../Components/Background";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  TextField,
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
import wave from "../Assets/Waves.png";
import i1 from "../Assets/i1.png";
import i2 from "../Assets/i2.png";
import i3 from "../Assets/i3.png";
import i4 from "../Assets/i4.png";
import i5 from "../Assets/i5.png";
import i6 from "../Assets/i6.png";
import i7 from "../Assets/i7.png";
import ExplorGrid from "../Components/ExplorGrid";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const CustomButtonGroup = () => (
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
            <h1 className="font-extrabold text-2xl md:text-5xl flex-1 text-center text-wrap">
              <span className="text-[#0554F2]">Tender</span> Sourcing Platform
              for Contractors in<span> </span>
              <span className="text-[#0554F2]">West Bengal</span>
            </h1>
          </div>
          <div className="text-sm md:text-2xl text-[#565656] flex-1 text-center text-wrap">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna ali
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mt-4 px-2">
            {/* Search Input */}
            <div className="flex  w-full max-w-[30rem] items-center relative">
              <span className="absolute left-3 z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  width="24px"
                  viewBox="0 -960 960 960"
                  fill="#999999"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </span>
              <input
                type="text"
                className="border-2 shadow-md border-gray-400 focus:border-blue-500 focus:outline-none w-full px-3 py-3.5 pl-10 rounded-md"
                placeholder="Search"
              />
            </div>

            {/* Autocomplete Dropdown */}
            <div className="w-full max-w-[15rem]">
              <Autocomplete
                disablePortal
                loading
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    padding: "0.4rem",
                    "& fieldset": {
                      borderColor: "#276BF2",
                    },
                    "&:hover fieldset": {
                      borderColor: "#276BF2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#276BF2",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#276BF2",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Indian Tenders"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#276BF2",
                        fontWeight: 500,
                        "& fieldset": {
                          borderColor: "#276BF2",
                        },
                        "&:hover fieldset": {
                          borderColor: "#276BF2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#276BF2",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#276BF2",
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root": {
                        color: "#276BF2",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#276BF2",
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:mt-64 flex justify-center items-center flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-60 md:mt-10">
        <div className="flex justify-center items-center gap-2 mt-4">
          <PlayCircleFilledWhiteOutlinedIcon />
          <span className="text-2xl font-normal text-[#565656]">
            See how it works
          </span>
        </div>
        <div>
          <button
            onClick={() => navigate("/signup")}
            className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                                hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
          >
            Register Now ! It’s free
          </button>
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
        className="lg:mt-34 min-h-full bg-slate-500 relative top-10 text-white px-6 md:px-12 lg:px-24 xl:px-32"
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
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-16 md:mt-0">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-4xl font-semibold w-full flex flex-col gap-3 md:gap-6">
              <span>Take a demo & get a </span>
              <span>guided walkthrough with a </span>
              <span>platform expert</span>
            </h1>
            <button className="py-2 px-3 rounded-lg bg-white text-[#0554F2] max-w-36">
              Request Demo
            </button>
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
      <div className="w-full  grid grid-cols-1 md:grid-cols-4  gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-32">
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
          <ExplorGrid
            title={"Construction Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i1}
          />
          <ExplorGrid
            title={"Road Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i2}
          />
          <ExplorGrid
            title={"Water Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i3}
          />
          <ExplorGrid
            title={"Building Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i4}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <ExplorGrid
            title={"Electrical Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i5}
          />
          <ExplorGrid
            title={"Painting Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i6}
          />
          <ExplorGrid
            title={"Medical Tenders"}
            subTitle={"11.4K Tenders"}
            pic={i7}
          />
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

      <div
        style={{
          backgroundImage: `url(${wave})`, // Corrected syntax
          backgroundSize: "cover", // Ensures it covers the area
          backgroundRepeat: "no-repeat", // Prevents repeating
          backgroundPosition: "center",
          objectFit: "contain",
        }}
        className="relative top-10 text-white px-6 md:px-12 lg:px-24 xl:px-32 min-h-72 flex flex-col justify-center items-center gap-8"
      >
        <h1 className="w-full text-center text-4xl font-normal text-black">
          Guaranteed Value for Money Plans
        </h1>
        <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
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
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => navigate("/pricing")}
            className="flex gap-2 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
                group"
          >
            View Pricing Plans
          </button>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                vitae recusandae ab ut cumque reprehenderit accusantium beatae
                explicabo qui, facere sint laboriosam porro assumenda unde!
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">test user</span>
                <span className="text-sm font-normal text-[#565656]">TEST</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                vitae recusandae ab ut cumque reprehenderit accusantium beatae
                explicabo qui, facere sint laboriosam porro assumenda unde!
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">test user</span>
                <span className="text-sm font-normal text-[#565656]">TEST</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                vitae recusandae ab ut cumque reprehenderit accusantium beatae
                explicabo qui, facere sint laboriosam porro assumenda unde!
              </p>
              <div className="flex flex-col">
                <span className="text-base font-medium">test user</span>
                <span className="text-sm font-normal text-[#565656]">TEST</span>
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
        <div className="w-full flex flex-col justify-start items-center">
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
