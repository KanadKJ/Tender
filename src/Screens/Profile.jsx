import React, { useEffect, useState } from "react";

import editSvg from "../Assets/Edit.svg";

import { useDispatch, useSelector } from "react-redux";

import {
  GetAddressDetails,
  GetCompanyDetails,
  InsertUpdateAddressData,
  InsertUpdateCompany,
  setData,
} from "../Redux/Slices/AuthSlice";
import { toast } from "react-toastify";
export default function Profile() {
  const dispatch = useDispatch();
  const { userData, companyDetailsData, addressDetailsData } = useSelector(
    (s) => s.auth
  );
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      dispatch(GetCompanyDetails(userData?.id));
      dispatch(GetAddressDetails(userData?.id));
    }
  }, [userData]);
  // hooks
  //local states

  const [formData, setFormData] = useState({
    first_name: userData?.firstName || "",
    email: userData?.email || "",
    mobile_no: userData?.mobileNo || "",
    companyName: companyDetailsData?.companyName || "",
    gstin: companyDetailsData?.gstin || "",
    yearOfEstablishment: companyDetailsData?.yearOfEstablishment || "",
    website: companyDetailsData?.website || "",
    state: addressDetailsData?.state || "",
    city: addressDetailsData?.city || "",
    village: addressDetailsData?.village || "",
    pinCode: addressDetailsData?.village || "",
    companyId: companyDetailsData?.id || null,
    addressId: addressDetailsData?.id || null,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      state: addressDetailsData?.state || "",
      city: addressDetailsData?.city || "",
      village: addressDetailsData?.village || "",
      pinCode: addressDetailsData?.pinCode || "",
      addressId: addressDetailsData?.id || null,
    });
  }, [addressDetailsData]);

  useEffect(() => {
    setFormData({
      ...formData,
      companyName: companyDetailsData?.companyName || "",
      gstin: companyDetailsData?.gstin || "",
      yearOfEstablishment: companyDetailsData?.yearOfEstablishment || "",
      website: companyDetailsData?.website || "",
      companyId: companyDetailsData?.id || null,
    });
  }, [companyDetailsData]);

  const [editSections, setEditSections] = useState({
    personal: false,
    company: false,
    address: false,
  });

  const [errors, setErrors] = useState({});
  //hooks

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
    const re = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return re.test(String(gstin));
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
      if (formData.gstin) {
        if (!validateGSTIN(formData.gstin)) {
          newErrors.gstin = "Invalid GSTIN";
        }
      }
      if (formData.yearOfEstablishment)
        if (
          formData?.yearOfEstablishment > 2099 ||
          formData?.yearOfEstablishment < 1900
        )
          newErrors.yearOfEstablishment =
            "Please provide valid Year Of Establishment";
      //   if (!formData.website) newErrors.website = "Website is required";
    }

    if (section === "address") {
      if (formData.pinCode) {
        if (!validatePinCode(formData.pinCode)) {
          newErrors.pinCode = "Invalid pin code";
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert(`Changes saved for ${section} section`);
      if (section === "company") {
        dispatch(
          InsertUpdateCompany({
            id: formData?.companyId,
            userId: userData?.id,
            companyName: formData?.companyName,
            yearOfEstablishment: formData?.yearOfEstablishment || 0,
            website: formData?.website,
            gstin: formData?.gstin,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(GetCompanyDetails(userData?.id));
          })
          .catch((e) => {
            toast.error(e);
          });
      }
      if (section === "address") {
        dispatch(
          InsertUpdateAddressData({
            id: formData?.addressId,
            userId: userData?.id,
            state: formData?.state,
            city: formData?.city,
            village: formData?.village,
            pinCode: formData?.pinCode,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(GetAddressDetails(userData?.id));
          })
          .catch((e) => {
            toast.error(e);
          });
      }

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
              {/* <div>
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
              </div> */}
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
                  placeholder="Full name"
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
                  placeholder="Email"
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
                  placeholder="Phone number"
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
                  placeholder="Enter company name"
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
                  placeholder="Enter GSTIN code"
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
                  placeholder="Enter year of establishment"
                  disabled={!editSections.company}
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
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
                  placeholder="Website"
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
                  placeholder="Enter state name"
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
                  placeholder="Enter city name"
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
                  placeholder="Enter village name"
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
                  placeholder="Enter pincode"
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
