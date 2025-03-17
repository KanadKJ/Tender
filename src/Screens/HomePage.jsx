import React from "react";
import { useSelector } from "react-redux";
import Background from "../Components/Background";
import { Autocomplete, TextField } from "@mui/material";
import gradiant from "../Assets/GradientSection.png";
export default function HomePage() {
  const { userData } = useSelector((s) => s.auth);

  return (
    <div className="mt-36 mb-10 z-40 ">
      <Background type={"default"} show={"yes"} isHome="yes" />
      <div className="flex px-6 md:px-12 lg:px-24 xl:px-32 ">
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
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="w-full my-8">
            <h1 className="text-4xl font-semibold w-full flex flex-col gap-6">
              <span>Use Our Cutting Edge Tech</span>
              <span>& Boost Your Business to</span>
              <span>the Next Level</span>
            </h1>
          </div>
          <div className="w-full flex flex-col gap-8 my-16">
            <div className="relative pb-4">
              <h1 className="text-xl text-right font-semibold">
                Realtime Update
              </h1>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
            <div className="relative pb-4">
              <h1 className="text-xl text-right font-semibold">
                Personalized Daily Notifications
              </h1>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
            <div className="relative pb-4">
              <h1 className="text-xl text-right font-semibold">Easy Search</h1>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
            <div className="relative pb-4">
              <h1 className="text-xl text-right font-semibold">Get Quote</h1>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-l from-[#fff] to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 pb-16">
          <div className="w-full flex justify-center items-center">
            <h1 className="font-semibold text-2xl uppercase">
              Our Achivements
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <div
              className="relative px-8 py-6 bg-gradient-to-br from-white/30 to-transparent 
    rounded-2xl border border-white/30 text-center w-72"
            >
              {/* Upper-left Fading Shadow */}
              <div
                className="absolute top-0 left-0 w-full h-full 
      bg-transparent rounded-2xl 
      shadow-[-1px_-1px_2px_rgba(255,255,255,0.5)] pointer-events-none"
              ></div>

              {/* Number */}
              <h1 className="relative text-4xl font-bold text-white">24k+</h1>

              {/* Description */}
              <p className="relative font-normal text-base text-white/80">
                number of successful tenders
              </p>
            </div>

            <div className="px-8 py-6 bg-gradient-to-br from-[#ffffff4c] to-transparent rounded-2xl border border-white/30 shadow-lg text-center w-72">
              <h1 className="text-4xl font-bold text-white">87%</h1>
              <p className="font-normal text-base">tender purchase growth</p>
            </div>
            <div className="px-8 py-6 bg-gradient-to-br from-[#ffffff4c] to-transparent rounded-2xl border border-white/30 shadow-lg text-center w-72">
              <h1 className="text-4xl font-bold text-white">9/10</h1>
              <p className="font-normal text-base">
                customer satisfaction score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
