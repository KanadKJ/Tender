import React, { useState } from "react";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Ribbons from "../Components/Ribbons";
import logo from "../Assets/Logo.png";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto flex justify-center flex-col items-center z-10 pt-4">
        <Background type={"default"} />
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
              Register now
            </h2>
            <h2 className="text-sm font-normal text-[#565656] text-center">
              All tenders contracts at one place
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="lname"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.lname ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4">
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

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="mb-6">
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
                  I agree to Company’s{" "}
                  <a className="text-blue-500">Terms of Service </a>and
                  <a className="text-blue-500"> Privacy Policy</a>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.termsAccepted}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#212121] text-white p-2 rounded"
              >
                Register
              </button>
            </form>
            <div className="w-full flex justify-center items-center mt-2">
              <span className="mt-2">
                Already have an Account?
                <a className="text-blue-500" onClick={() => navigate("/login")}>
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
        <Ribbons />
      </div>
    </>
  );
};

export default Register;
