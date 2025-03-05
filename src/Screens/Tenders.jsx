import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTenderList,
  GetTenderListWithFilters,
} from "../Redux/Slices/TenderSlice";

import {
  Button,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DummyStates } from "../Utils/CommonUtils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function Tenders() {
  //state
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keywords: searchParams.get("keywords") || "",
    states: searchParams.get("state") || [],
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  // hooks
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keywords) params.set("keywords", filters.keywords);
    if (filters.states) params.set("states", filters.state);
    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  useEffect(() => {
    if (filters.keywords || filters.state) {
      dispatch(GetTenderListWithFilters(filters));
    } else {
      dispatch(GetTenderList());
    }
  }, [filters, dispatch]);

  // redux
  const { tenderData } = useSelector((s) => s.tender);
  // console.log(tenderData, "tender page");

  const handleClick = (event, id) => {
    if (openPopoverId === id) {
      setAnchorEl(null);
      setOpenPopoverId(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpenPopoverId(id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverId(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Format the date (Feb 28, 2025)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);

    // Format the time (4:30 am)
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return [formattedDate, formattedTime];
  };
  const handleReset = (name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: "",
    }));
  };

  const handleFilterSelection = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Ensure value is correctly passed
    // dispatch(GetTenderListWithFilters({ name: value }));
  };
  console.log(filters);
  const handleFilterSaved = () => {
    handleClose();
    console.log(filters);
    dispatch(GetTenderListWithFilters(filters));
  };

  const CloseBTN = () => {
    return (
      <IconButton onClick={handleClose} size="small">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#999999"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </IconButton>
    );
  };
  return (
    <div className="mt-14 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40">
      <Background type="vector" lifed="up" />
      <main className="w-full flex flex-col justify-center items-center gap-6">
        <div className="mt-6 flex flex-col gap-3 w-full justify-center items-center">
          <div className="w-full flex  justify-center items-center">
            <h1 className="font-normal text-5xl text-center">
              Tenders at a glance
            </h1>
          </div>
          <div className="w-full flex  justify-center items-center">
            <h3 className="font-normal text-xl text-center">
              Choose the best plan for your business.
            </h3>
          </div>
        </div>
        <div className="w-full flex  justify-center items-center ">
          <span className="relative left-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#999999"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </span>
          <input
            type="text"
            className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none w-full max-w-[30rem] p-2 pl-11 rounded-md"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <div>
            <Button
              aria-describedby="Keywords"
              variant="contained"
              onClick={(event) => handleClick(event, "Keywords")}
            >
              Keywords
            </Button>
            <Popover
              id="Keywords"
              open={openPopoverId === "Keywords"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div className="w-full flex justify-between items-center p-2">
                <label className="pl-2">Keywords</label>
                <CloseBTN />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Keywords"
                  name="keywords"
                  value={filters?.keywords}
                  onChange={handleFilterSelection}
                  className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none p-2 rounded-md"
                />
                <div className="flex justify-around">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("keywords")}
                  >
                    Reset
                  </button>
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleFilterSaved}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Popover>
          </div>
          <div>
            <Button
              aria-describedby="popover1"
              variant="contained"
              onClick={(event) => handleClick(event, "popover1")}
            >
              State Filter
            </Button>
            <Popover
              id="popover1"
              open={openPopoverId === "popover1"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={filters?.states}
                onChange={handleFilterSelection}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {DummyStates.map(({ statename, id }) => (
                  <MenuItem key={id} value={statename}>
                    <Checkbox checked={filters?.states?.includes(statename)} />
                    <ListItemText primary={statename} />
                  </MenuItem>
                ))}
              </Select>
            </Popover>
          </div>

          <div>
            <Button
              aria-describedby="popover2"
              variant="contained"
              onClick={(event) => handleClick(event, "popover2")}
            >
              City Filter
            </Button>
            <Popover
              id="popover2"
              open={openPopoverId === "popover2"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Typography sx={{ p: 2 }}>
                {/* ✅ Independent Data Inside Popover */}
                <p>Select City</p>
                <select>
                  <option value="mumbai">Mumbai</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </Typography>
            </Popover>
          </div>

          <div>
            <Button
              aria-describedby="popover3"
              variant="contained"
              onClick={(event) => handleClick(event, "popover3")}
            >
              Organization Filter
            </Button>
            <Popover
              id="popover3"
              open={openPopoverId === "popover3"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Typography sx={{ p: 2 }}>
                {/* ✅ Different Filter Data */}
                <p>Select Organization</p>
                <select>
                  <option value="gov">Government</option>
                  <option value="private">Private</option>
                </select>
              </Typography>
            </Popover>
          </div>

          <div>
            <select className="w-auto">
              <option defaultChecked>Organisation</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <select
              className="w-auto"
              onChange={handleFilterSelection}
              name="states"
            >
              <option value="" defaultChecked>
                State
              </option>
              <option value="29">West Bengal</option>
              <option value="30">and</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <select
              className="w-auto"
              name="districts"
              onChange={handleFilterSelection}
            >
              <option defaultChecked>District</option>
              <option value={"560"}>BIRBHUM</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div>
            <select className="w-auto">
              <option defaultChecked>Amount</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <select className="w-auto">
              <option defaultChecked>Published Date</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <select className="w-auto">
              <option defaultChecked>Closing Date</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <select className="w-auto">
              <option defaultChecked>Sort</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>

        {tenderData?.results?.map((tender, i) => (
          <div
            key={tender?.uid}
            className="flex flex-col md:flex-row w-full justify-between  bg-white py-6  pl-4 rounded-md gap-4"
          >
            <div className="w-full flex flex-col gap-5">
              <div className="flex gap-4 flex-col md:flex-row">
                <h1 className="text-base font-semibold">
                  {tender?.department}
                </h1>
                <div>
                  <span className="p-1 bg-[#EAEAEA] text-xs rounded-md">
                    {tender?.product_category}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis line-clamp-2">
                <p>{tender?.description}</p>
              </div>

              <div className="flex gap-4">
                <button
                  className="px-3 py-1 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                  hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                >
                  View
                </button>
                <button
                  className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
            hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
            group"
                >
                  Download
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="white"
                      className="transition-all duration-300 ease-in-out group-hover:fill-[#0554F2]"
                    >
                      <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
              <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm">
                <h6 className="text-sm font-normal text-[#565656]">
                  Published Date
                </h6>
                <p className="text-[#212121] text-base font-medium">
                  {formatDateTime(tender?.published_date)[0]} <br />
                  {formatDateTime(tender?.published_date)[1]}
                </p>
              </div>
              <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm">
                <h6 className="text-sm font-normal text-[#565656]">
                  Closing Date
                </h6>

                <p className="text-[#212121] text-base font-medium">
                  {formatDateTime(tender?.bid_submission_end_date)[0]} <br />
                  {formatDateTime(tender?.bid_submission_end_date)[1]}
                </p>
              </div>
              <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm">
                <h6 className="text-sm font-normal text-[#565656]">
                  Tender Amount
                </h6>
                <p className="text-[#212121] text-base font-medium">
                  Feb 23, 2025 <br />
                  4:30 am
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
