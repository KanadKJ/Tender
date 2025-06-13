import React, { useState } from "react";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import authgrd from "../Assets/AUTHGRD.png";
import otpillus from "../Assets/OTP.png";
import logo from "../Assets/logoNew.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    mobile_no: "",
    password: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
    }));
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Full Name is required";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "Terms and Conditions must be accepted to signup.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.mobile_no)) {
      newErrors.mobile_no = "Phone must be 10 digits";
    }

    // if (!formData.password.trim()) {
    //   newErrors.password = "Password is required";
    // } else if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    navigate("/validateOtp", {
      state: {
        phone: formData.mobile_no,
        userDetails: formData,
        pageFrom: "register",
      },
    });
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
            Ready to join us?
          </h2>
          <h2 className="text-xl font-bold mb-2 text-center text-[#212121]">
            Register now
          </h2>
          <h2 className="text-sm font-normal text-[#565656] text-center">
            All tender contracts at one place
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="lname">
                Full Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.lname ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  *{errors.first_name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
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
                <p className="text-red-500 text-sm mt-1">*{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="mobile_no"
              >
                Phone
              </label>
              <input
                type="text"
                id="mobile_no"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.mobile_no ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.mobile_no && (
                <p className="text-red-500 text-sm mt-1">*{errors.mobile_no}</p>
              )}
            </div>

            {/* <div className="mb-6">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">*{errors.password}</p>
              )}
            </div> */}
            <div className="mb-2 flex items-center gap-4">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label htmlFor="termsAccepted" className="text-sm">
                I agree to Company’s
                <a
                  className="text-blue-500 px-1"
                  onClick={() => navigate("/T&C")}
                >
                  Terms of Service{" "}
                </a>
                and
                <a
                  className="text-blue-500 px-1"
                  onClick={() => navigate("/T&C")}
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.termsAccepted}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#212121] text-white p-2 rounded mt-4"
            >
              Register
            </button>
          </form>
          <div className="w-full flex justify-center items-center mt-2">
            <span className="mt-2">
              Already have an Account?
              <a
                className="text-blue-500 px-1 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </span>
          </div>
          {errors.loginError && (
            <p className="text-red-500 text-sm mt-1">*{errors.loginError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
