import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import logo from "../Assets/logoNew.png";
import Ribbons from "../Components/Ribbons";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import authgrd from "../Assets/AUTHGRD.png";
import otpillus from "../Assets/OTP.png";
const LoginPage = () => {
  // state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({});

  // hooks
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
  const { authIsLoading } = useSelector((s) => s.auth);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await dispatch(GetUserDetails(formData)).unwrap();

      if (!response) {
        return; // Stop execution, prevent navigation
      }

      navigate("/dashboard/profile");
    } catch (error) {
      setErrors({ loginError: error });
    }
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
              3 Days Free Trial for New Year
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mt-8">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Mobile Number
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#212121] text-white p-2 rounded "
            >
              {authIsLoading ? "Sending OTP" : "Request OTP"}
            </button>
            <div className="w-full flex justify-center items-center">
              {errors.loginError && (
                <p className="text-red-500 text-sm mt-1">{errors.loginError}</p>
              )}
            </div>
          </form>
          <div className="w-full flex justify-center items-center mt-2">
            <span className="mt-2">
              Don’t have an account?
              <a
                className="text-blue-500 px-1 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Register
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
