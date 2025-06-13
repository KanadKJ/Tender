import React, { useState } from "react";
import Background from "../Components/Background";
import logo from "../Assets/Logo.png";

import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <>
      <div className="max-w-md mx-auto flex justify-center flex-col items-center z-10 pt-4">
        <Background type={"default"} show="yes" />
        <div className="w-full max-w-[360px] md:max-w-[400px] flex flex-col justify-center items-center">
          <div
            className="h-[90px] w-[90px] mb-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" />
          </div>
          <div className="w-full bg-white mt-2 rounded-lg border p-6">
            <h2 className="text-sm font-normal text-[#565656] mb-2 text-center">
              Ready to join us?
            </h2>
            <h2 className="text-3xl font-bold mb-2 text-center text-[#212121]">
              Sign in now
            </h2>
            <h2 className="text-sm font-normal text-[#565656] text-center">
              All tenders contracts at one place
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mt-8">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
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
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-2">
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
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#212121] text-white p-2 rounded "
              >
                {authIsLoading ? "Processing..." : "Login"}
              </button>
              <div className="w-full flex justify-center items-center">
                {errors.loginError && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.loginError}
                  </p>
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
    </>
  );
};

export default Login;
