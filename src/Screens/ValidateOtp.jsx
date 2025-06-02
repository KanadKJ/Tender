import React, { useEffect, useRef, useState } from "react";
import Background from "../Components/Background";
import logo from "../Assets/logoNew.png";
import Ribbons from "../Components/Ribbons";
import { useDispatch, useSelector } from "react-redux";
import { GetOtp, GetUserDetails } from "../Redux/Slices/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import authgrd from "../Assets/AUTHGRD.png";
import otpillus from "../Assets/OTP.png";
const ValidateOtp = () => {
  // state

  const [otp, setOtp] = useState(null);
  console.log(otp);

  const [errors, setErrors] = useState({});
  const [showResendNow, setShowResendNow] = useState(true);
  const [userData, setUserData] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 2 mins 30 secs
  const intervalRef = useRef(null);
  // hooks
  const location = useLocation();
  const { phone } = location?.state || {};
  console.log(phone);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     let data = JSON.parse(user);
  //     navigate("/profile");
  //     setUserData(...data);
  //   }
  // }, []);
  // redux states
  const { authIsLoading, error } = useSelector((s) => s.auth);
  console.log(error);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // to check if the user has reloaded the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isRefreshing", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    if (sessionStorage.getItem("isRefreshing") === "true") {
      sessionStorage.removeItem("isRefreshing");
      navigate("/");
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  // validation
  const validateForm = () => {
    const newErrors = {};
    console.log("string", otp?.toString());

    if (otp?.toString()?.length < 4 || otp === null) {
      newErrors.otp = "Please provide valid OTP.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // form submission
  const handleOtp = async (e) => {
    if (!validateForm()) {
      return;
    }

    try {
      let obj = {
        mobileNumber: `91${phone}`,
        otp: otp,
      };
      const response = await dispatch(GetUserDetails(obj)).unwrap();
      console.log(response);
      if (response?.statusCode === 404) {
        setErrors({ loginError: "User not found" });
        return; // Stop execution, prevent navigation
      }
      if (response?.valid) {
        navigate("/dashboard/profile");
      }
      //   if (response?.success) {
      //     setShowOtp(true);
      //   }
      //   navigate("/dashboard/profile");
    } catch (error) {
      setErrors({ loginError: error });
    }
  };
  const handleResend = () => {
    setShowResendNow(false);
    dispatch(GetOtp(phone));
  };
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <div className="p-3 flex-1 w-full flex ">
      <Background type={"default"} />
      <div
        className="z-0 bg-white hidden lg:flex flex-col rounded-md justify-start items-start w-full"
        style={{
          backgroundImage: `url(${authgrd})`, // Corrected syntax
          backgroundSize: "cover", // Ensures it covers the area
          backgroundRepeat: "no-repeat", // Prevents repeating
          backgroundPosition: "center",
          objectFit: "contain",
        }}
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logo} alt="pagelogo" className="h-[80px]" />
        </div>
        <div>
          <h1 className="text-4xl font-medium pl-4">
            Start your tender journey
          </h1>
        </div>
        <div className="z-10 flex flex-col justify-between items-start pl-4  mt-4 gap-4">
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-sm font-normal">
              14 Days Free Trial for New Year
            </h1>
          </div>
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-sm font-normal">
              Get Right Tender, with Right Filters
            </h1>
          </div>
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-sm font-normal">
              No Credit Card Required
            </h1>
          </div>
          <div className="text-green-500 flex justify-center items-center gap-2">
            <CheckCircleOutlineOutlinedIcon />
            <h1 className="text-[#212121] text-sm font-normal">
              No Hidden Charges
            </h1>
          </div>
        </div>
        <div className="relative top-[-150px] -z-10">
          <img src={otpillus} alt="OTPIllust" />
        </div>
      </div>
      <div className="w-full h-screen lg:w-2/3 flex justify-center items-center">
        <div className="max-w-[360px] bg-white mt-2 rounded-lg border p-6">
          <div
            onClick={() => navigate("/")}
            className="flex lg:hidden justify-center items-center w-full cursor-pointer"
          >
            <img src={logo} alt="pagelogo" className="h-[80px]" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center text-[#212121]">
            Welcome
          </h2>
          <h2 className="text-sm font-normal text-[#565656] text-center">
            All tender contracts at one place
          </h2>
          <div className="flex flex-col gap-4">
            <div className="mt-8 w-full flex  justify-center items-center gap-2 ">
              <input
                type="text"
                id="number"
                name="number"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow digits and max 10 characters
                  if (/^\d{0,4}$/.test(value)) {
                    setOtp(value);
                  }
                }}
                placeholder="Enter OTP"
                className={`w-full p-2 border ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            {errors?.otp && (
              <p className="text-red-500 text-sm mt-1">{errors?.otp}</p>
            )}
            {error && (
              <div className="flex">
                <p className="text-red-500 text-sm mt-1">{`${
                  error[0] && error[0]
                }, ${(error[1] && JSON.parse(error[1])?.message) || ""}`}</p>
              </div>
            )}
            <div>
              {timeLeft > 0 ? (
                <p>
                  Resend OTP in <strong>{formatTime(timeLeft)}</strong>
                </p>
              ) : showResendNow ? (
                <button onClick={handleResend} className="text-[#0554F2]">
                  Resend OTP
                </button>
              ) : (
                <p>OTP Resent</p>
              )}
            </div>
            <button
              onClick={handleOtp}
              className="w-full bg-[#212121] text-white p-2 rounded "
            >
              {"Submit"}
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            {errors?.loginError && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.loginError.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateOtp;
