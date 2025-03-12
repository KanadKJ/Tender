import React from "react";
import footerImg from "../Assets/FooterGradient.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        backgroundImage: `url(${footerImg})`, // Corrected syntax
        backgroundSize: "cover", // Ensures it covers the area
        backgroundRepeat: "no-repeat", // Prevents repeating
        backgroundPosition: "center",
        objectFit: "contain",
      }}
      className="min-h-52 bg-slate-500 relative bottom-0 text-white"
    >
      <div className="mt-14 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40 flex flex-col md:flex-row justify-center items-center">
        <div className="w-full flex flex-col gap-8">
          <h1 className="text-4xl">Menoka Enterprise</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            nulla modi ab?
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <p className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </p>
          <p className="cursor-pointer" onClick={() => navigate("/tenders")}>
            Tenders
          </p>
          <p className="cursor-pointer" onClick={() => navigate("/")}>
            Pricing
          </p>
          <p className="cursor-pointer" onClick={() => navigate("/")}>
            About Us
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-between gap-16">
          <div className="flex gap-4">
            <span>
              <InstagramIcon />
            </span>
            <span>
              <XIcon />
            </span>
            <span>
              <YouTubeIcon />
            </span>
            <span>
              <LinkedInIcon />
            </span>
          </div>
          <div>
            <p>3891 Ranchview Dr. Richardson, California 62639</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
