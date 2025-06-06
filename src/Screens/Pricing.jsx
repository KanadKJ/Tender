import React, { useState } from "react";
import Background from "../Components/Background";

import PriceContainer from "../Components/PriceContainer";
import { pricingPlanData } from "../Utils/CommonUtils";
import pg from "../Assets/PricingGradient.png";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="mt-20 ">
      <Background type={"default"} show="no" />
      <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-center text-6xl font-normal text-black mt-8">
          Flexible Pricing Plans
        </h1>
        <h6 className="text-2xl font-normal w-full text-center">
          Choose the best plan for your business.
        </h6>
        <div className="w-full grid  md:grid-cols-4 gap-4 my-8 justify-center">
          <PriceContainer data={pricingPlanData.free} />
          <PriceContainer data={pricingPlanData.basic} />
          <PriceContainer data={pricingPlanData.deluxe} />
          <PriceContainer data={pricingPlanData.advance} />
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <button
            className="text-base font-normal text-[#0554F2]"
            onClick={() => setShow(true)}
          >
            View more plans
          </button>
        </div>
        {show && (
          <div className="w-full grid  md:grid-cols-4 gap-6 my-8 justify-center">
            <PriceContainer data={pricingPlanData.standard} />
            <PriceContainer data={pricingPlanData.professional} />
            <PriceContainer data={pricingPlanData.premium} />

            <div
              style={{
                backgroundImage: `url(${pg})`, // Corrected syntax
                backgroundSize: "cover", // Ensures it covers the area
                backgroundRepeat: "no-repeat", // Prevents repeating
                backgroundPosition: "center",
                objectFit: "contain",
              }}
              className="h-full border border-[#212121] rounded-3xl max-w-60 p-4 flex flex-col gap-1 bg-white"
            >
              <h6 className="text-3xl font-semibold text-[#fff] text-start mt-2">
                Plan on Demand
              </h6>
              <p className="text-[#c1d8fc] text-sm font-normal">
                Custom Pricing / Flexible Terms
              </p>
              <div className="flex flex-col justify-start text-start">
                <h6 className="text-base font-normal text-[#ffffffd4] pt-6">
                  Contact : +91 8759441352
                </h6>
              </div>
              <p className="text-[#fffffff0] text-base font-normal text-start">
                View job tenders of your choice
              </p>
              <div className="mt-2">
                <h6 className="text-sm font-semibold text-white text-start">
                  *This plan is for those who work in Customize Department,
                  Category, District, Panchayat, Trade etc.
                </h6>
              </div>
              <button
                onClick={() =>
                  navigate("/help", { state: { cname: "Plan on demand" } })
                }
                className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-normal text-[#0554F2] 
            hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out my-12"
              >
                Request Tender My Choice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
