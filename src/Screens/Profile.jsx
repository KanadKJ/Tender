import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import editSvg from "../Assets/Edit.svg";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Components/SideBar";
export default function Profile() {
  const { userData } = useSelector((s) => s.auth);
  console.log(userData);

  // hooks
  //local states

  const [formData, setFormData] = useState({
    first_name: userData?.firstName || "",
    email: userData?.email || "",
    mobile_no: userData?.mobileNo || "",
    companyName: "",
    gstin: "",
    yearOfEstablishment: "",
    website: "",
    state: "",
    city: "",
    village: "",
    pinCode: "",
  });
  const [editSections, setEditSections] = useState({
    personal: false,
    company: false,
    address: false,
  });

  const [errors, setErrors] = useState({});
  //hooks

  const dispatch = useDispatch();
  // redux state

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobileNo = (mobile_no) => {
    const re = /^\+?\d{10,}$/;
    return re.test(String(mobile_no));
  };

  const validateGSTIN = (gstin) => {
    const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    // return re.test(String(gstin));
    return true;
  };

  const validatePinCode = (pinCode) => {
    const re = /^[1-9][0-9]{5}$/;
    return re.test(String(pinCode));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (section) => {
    const newErrors = {};

    if (section === "personal") {
      if (!formData.first_name) newErrors.first_name = "Full name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.mobile_no) {
        newErrors.mobile_no = "Phone number is required";
      } else if (!validateMobileNo(formData.mobile_no)) {
        newErrors.mobile_no = "Invalid phone number";
      }
    }

    if (section === "company") {
      if (!formData.companyName)
        newErrors.companyName = "Company name is required";
      if (!formData.gstin) {
        newErrors.gstin = "GSTIN is required";
      } else if (!validateGSTIN(formData.gstin)) {
        newErrors.gstin = "Invalid GSTIN";
      }
      if (!formData.yearOfEstablishment)
        newErrors.yearOfEstablishment = "Year of establishment is required";
      //   if (!formData.website) newErrors.website = "Website is required";
    }

    if (section === "address") {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.village) newErrors.village = "Village is required";
      if (!formData.pinCode) {
        newErrors.pinCode = "Pin code is required";
      } else if (!validatePinCode(formData.pinCode)) {
        newErrors.pinCode = "Invalid pin code";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Changes saved for ${section} section`);
      // Here you can add logic to save changes to the backend
      setEditSections((prev) => ({ ...prev, [section]: !prev[section] }));
    }
  };
  const handleFormEdit = (section) => {
    setEditSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <section className=" flex justify-between gap-4">
        <main className="w-full flex flex-col gap-5 ">
          <div className="flex flex-col w-full p-5 gap-5 rounded-lg shadow-md bg-white">
            <div className="w-full flex justify-between">
              <h1 className="text-lg text-[#212121] font-medium">
                PERSONAL DETAILS
              </h1>
              <div>
                {editSections.personal ? (
                  <button
                    className="text-[#0554F2]"
                    onClick={() => handleSubmit("personal")}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button onClick={() => handleFormEdit("personal")}>
                    <img src={editSvg} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row  justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Full name
              </label>
              <div className="w-full">
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="Cameron Williamson"
                  disabled={!editSections.personal}
                />
                {errors.first_name && (
                  <span className="text-red-500">{errors.first_name}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Email
              </label>
              <div className="w-full">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="cameron_williamson@example.com"
                  disabled={!editSections.personal}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Phone number
              </label>
              <div className="w-full">
                <input
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="+91 9874563210"
                  disabled={!editSections.personal}
                />
                {errors.mobile_no && (
                  <span className="text-red-500">{errors.mobile_no}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-5 gap-5 rounded-lg shadow-md bg-white">
            <div className="w-full flex justify-between">
              <h1 className="text-lg text-[#212121] font-medium">
                COMPANY DETAILS
              </h1>
              <div>
                {editSections.company ? (
                  <button
                    className="text-[#0554F2]"
                    onClick={() => handleSubmit("company")}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button onClick={() => handleFormEdit("company")}>
                    <img src={editSvg} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row  justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Company Name
              </label>
              <div className="w-full">
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="MENOKA"
                  disabled={!editSections.company}
                />
                {errors.companyName && (
                  <span className="text-red-500">{errors.companyName}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                GSTIN
              </label>
              <div className="w-full">
                <input
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="00XXXXX0000X0X0"
                  disabled={!editSections.company}
                />
                {errors.gstin && (
                  <span className="text-red-500">{errors.gstin}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Year of establishment
              </label>
              <div className="w-full">
                <input
                  name="yearOfEstablishment"
                  value={formData.yearOfEstablishment}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="01/01/2000"
                  disabled={!editSections.company}
                  type="date"
                />
                {errors.yearOfEstablishment && (
                  <span className="text-red-500">
                    {errors.yearOfEstablishment}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Website
              </label>
              <div className="w-full">
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="menoka.com"
                  disabled={!editSections.company}
                />
                {errors.website && (
                  <span className="text-red-500">{errors.website}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-5 gap-5 rounded-lg shadow-md bg-white">
            <div className="w-full flex justify-between">
              <h1 className="text-lg text-[#212121] font-medium">ADDRESS</h1>
              <div>
                {editSections.address ? (
                  <button
                    className="text-[#0554F2]"
                    onClick={() => handleSubmit("address")}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button onClick={() => handleFormEdit("address")}>
                    <img src={editSvg} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row  justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                State
              </label>
              <div className="w-full">
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="West Bengal"
                  disabled={!editSections.address}
                />
                {errors.state && (
                  <span className="text-red-500">{errors.state}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                City
              </label>
              <div className="w-full">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="Kolkata"
                  disabled={!editSections.address}
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Village
              </label>
              <div className="w-full">
                <input
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="Kalikata"
                  disabled={!editSections.address}
                />
                {errors.village && (
                  <span className="text-red-500">{errors.village}</span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <label className="w-2/3 text-base text-[#565656] font-medium">
                Pin Code
              </label>
              <div className="w-full">
                <input
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full border-gray-400 rounded-md p-2 border bg-white"
                  placeholder="700001"
                  disabled={!editSections.address}
                />
                {errors.pinCode && (
                  <span className="text-red-500">{errors.pinCode}</span>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
