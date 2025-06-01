import React, { useState } from "react";
import Background from "../Components/Background";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { InsertContactQueries } from "../Redux/Slices/CommonSlice";
import { useNavigate } from "react-router-dom";

const category = [
  { cname: "Help for bid submission" },
  { cname: "Need Demo" },
  { cname: "Get Digital signature certificate" },
  { cname: "Report for missing tender" },
  { cname: "Request for inactive account" },
  { cname: "plan on demand" },
  { cname: "Others" },
];

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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe]">
      <Background type={"default"} show="no" />

      <div className="w-full max-w-5xl px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#1e293b] mb-2">
          Need Help? We're Here for You!
        </h1>
        <p className="text-[#64748b] text-base sm:text-lg">
          Fill out the form below and our team will get in touch with you soon.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center my-12 bg-white p-8 shadow-2xl rounded-xl border border-gray-200">
        <div className="space-y-6 ">
          {/* Category */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <label className="w-28 text-[#334155] font-medium">Category</label>
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <label className="w-28 text-[#334155] font-medium">Full Name</label>
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <label className="w-28 text-[#334155] font-medium">Contact</label>
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <label className="w-28 text-[#334155] font-medium">Query</label>
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
            <div className="flex justify-center pt-4">
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
    </div>
  );
}
