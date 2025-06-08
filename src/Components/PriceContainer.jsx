import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import logo from "../Assets/logoNew.png";
import axios from "axios";
import { setData } from "../Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { TMAPI_BASE_URL } from "../Utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function PriceContainer({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((s) => s.auth);
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);
  function loadScript(src) {
    setIsLoading(true);
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const displayRazorpay = async (price, title, planID) => {
    if (!userData) {
      navigate("/login");
      return;
    }

    if (title === "Free" || price === "0") return;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(`${TMAPI_BASE_URL}/createOrder`, {
      amount: price,
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    setIsLoading(false);
    const { amount, id } = result.data;
    const options = {
      key: "rzp_live_hG8SfOdRr9wzIf",
      amount: amount.toString(),
      currency: "INR",
      name: "eTenderMitra",
      description: `Purchasing ${title} plan`,
      image: logo,
      order_id: id,
      handler: async function (response) {
        const data = {
          paymentId: response.razorpay_payment_id,
          amount: amount.toString(),
          orderId: response.razorpay_order_id,
          userId: userData?.id,
          planId: planID,
          paymentStatus: "success",
        };
        const result = await axios.post(`${TMAPI_BASE_URL}/capture`, data);
        if (result?.data?.success) {
          toast.success("Payment completed successfully..!");
        }
      },
      prefill: {
        name: userData?.firstName,
        email: userData?.email,
        contact: userData?.mobileNo,
      },

      theme: {
        color: "#0554f2",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Backdrop
        sx={(theme) => ({
          color: "#0554f29e",
          zIndex: theme.zIndex.drawer + 100,
        })}
        open={isLoading}
      >
        <CircularProgress color="#0554f2" />
      </Backdrop>
      <div className="w-full border border-[#212121] rounded-3xl max-w-64 p-4 flex flex-col gap-1 bg-white">
        <h6 className="text-lg font-semibold text-[#212121]">{data?.title}</h6>
        <div className="flex justify-start items-center">
          <h1 className="text-5xl font-normal text-[#212121]">{`₹${data?.price}`}</h1>
          <h6 className="text-base font-normal text-[#212121]">
            {data?.price === "0" ? "14 days" : "/ 1 Year"}
          </h6>
        </div>
        <p
          className={`text-[#565656] text-sm font-normal ${data?.minHeight}`}
        >
          {data?.subTitle}
        </p>
        <button
          onClick={() => displayRazorpay(data?.price, data?.title, data?.id)}
          className={`gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-base font-normal text-[#0554F2] 
            hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out 
               my-6`}
        >
          {`Start with ${data?.title}`}
        </button>
        <Divider sx={{ color: "#212121" }} />
        <div className="mt-4">
          {data?.featurs?.map((d, i) => (
            <p key={i} className="flex gap-1 items-center">
              <span>
                {d ? (
                  <DoneIcon sx={{ color: "#747474" }} />
                ) : (
                  <span className="invisible">.</span>
                )}
              </span>
              <span className="text-xs font-normal text-[#565656]">{d}</span>
            </p>
          ))}
        </div>
        <div className="mt-2">
          <h6 className="text-sm font-semibold">*{data?.caption}</h6>
        </div>
      </div>
    </>
  );
}
