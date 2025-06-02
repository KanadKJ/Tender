import React, { useState } from "react";
import Background from "../Components/Background";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { InsertContactQueries } from "../Redux/Slices/CommonSlice";
import { useNavigate } from "react-router-dom";
import { category } from "../Utils/CommonUtils";
import authgrd from "../Assets/AUTHGRD.png";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import logo from "../Assets/logoNew.png";
import otpillus from "../Assets/pana.png";
export default function Help() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [option, setOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [userQuery, SetUserQuery] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleFormSumit = async () => {
    if (!option) {
      setError("Please select category.");
      return;
    }
    if (fullName === "") {
      setError("Please provide your full name.");
      return;
    }
    if (
      contact === "" ||
      contact?.toString()?.length > 10 ||
      contact?.toString()?.length < 10
    ) {
      setError("Please vaild phone number");
      return;
    }
    if (userQuery === "" || userQuery?.length === 0) {
      setError("Please your query");
      return;
    }

    let obj = {
      category: option?.cname,
      fullName,
      contact,
      query: userQuery,
    };
    // console.log(obj);

    let res = await dispatch(InsertContactQueries(obj));
    if (res?.payload[0] === "Query submitted successfully.") {
      setSuccess([
        "Your query is sumitted. We will contact you shortly. Thank you!!",
        "You will be redirect to the Home page.",
      ]);
      setTimeout(() => {
        navigate("/");
      }, [5000]);
    }
  };
  return (
    <div className="p-3 flex-1 w-full flex mt-16">
      <Background type={"default"} />
      <div className="w-full h-screen lg:w-2/3 flex justify-center items-center gap-4">
        <div className="w-full max-w-[360px] bg-white mt-2 rounded-lg border p-6 flex flex-col justify-center items-center gap-4">
          {/* Category */}
          <div className="w-full flex flex-col items-start  gap-2">
            <label className="text-black text-start font-medium">
              Select Category
            </label>
            <div className="w-full max-w-sm">
              <Autocomplete
                size="small"
                value={option}
                onChange={(event, newValue) => setOption(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setError("");
                  setInputValue(newInputValue);
                }}
                id="category-autocomplete"
                options={category}
                getOptionLabel={(option) => option?.cname}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="w-full flex flex-col items-start  gap-2">
            <label className="text-black text-start font-medium">
              Full Name
            </label>
            <input
              onChange={(e) => {
                setFullName(e.target.value);
                setError("");
              }}
              type="text"
              placeholder="Enter your full name"
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Contact */}
          <div className="w-full flex flex-col items-start  gap-2">
            <label className="text-black text-start font-medium">Contact</label>
            <input
              onChange={(e) => {
                setError("");
                setContact(e.target.value);
              }}
              type="number"
              placeholder="Enter your contact number"
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Query */}
          <div className="w-full flex flex-col items-start  gap-2">
            <label className="text-black text-start font-medium">Query</label>
            <textarea
              onChange={(e) => {
                setError("");
                SetUserQuery(e.target.value);
              }}
              rows={4}
              placeholder="Write your query..."
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <p>{error}</p>
          </div>
          {/* Submit Button */}
          {success !== null ? (
            <div>
              <p>{success[0]}</p>
              <p>{success[1]}</p>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleFormSumit}
              >
                Submit Query
              </Button>
            </div>
          )}
        </div>
      </div>
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
        <div
          onClick={() => navigate("/")}
          className="w-full flex justify-center items-center cursor-pointer"
        >
          <img src={logo} alt="pagelogo" className="h-[80px]" />
        </div>
        <div className="w-full flex justify-center items-center">
          <h1 className="text-4xl font-medium pl-4">Need Help?</h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <h6 className="text-xl font-normal pl-4">
            We’re here to help you in your each & every tender needs.
          </h6>
        </div>

        <div className="w-full relative top-5 -z-10 flex justify-center items-center">
          <img src={otpillus} alt="OTPIllust" style={{ maxHeight: "60vh" }} />
        </div>
      </div>
    </div>
  );
}
