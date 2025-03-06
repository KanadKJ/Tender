import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTenderList,
  GetTenderListWithFilters,
} from "../Redux/Slices/TenderSlice";
import {
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  amountOptions,
  dateOptions,
  formatDateTime,
} from "../Utils/CommonUtils";
import {
  GetDistrictsList,
  GetOrgList,
  GetStatesList,
} from "../Redux/Slices/CommonSlice";
import useQueryParams from "../Hooks/useQueryParams";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      minWidth: 200,
    },
  },
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Tenders() {
  // redux
  const { tenderData, tenderIsLoading } = useSelector((s) => s.tender);
  const { isDistrictCallLoading, districtsData, statesData, orgData } =
    useSelector((s) => s.common);
  //state
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    keywords: searchParams.get("keywords") || "",
    states:
      searchParams
        .getAll("states")
        ?.map((id) => {
          const state = statesData.find((d) => d.id === parseInt(id));
          return state ? state : null;
        })
        .filter(Boolean) || [],
    districts:
      searchParams
        .getAll("districts")
        ?.map((id) => {
          const district = districtsData.find((d) => d.id === parseInt(id));
          return district ? district : null;
        })
        .filter(Boolean) || [],
    organisations:
      searchParams
        .getAll("organisations")
        ?.map((id) => {
          const organisation = orgData.find((d) => d.id === parseInt(id));
          return organisation ? organisation : null;
        })
        .filter(Boolean) || [],
    value_in_rs_min: searchParams.get("value_in_rs_min") || "",
    value_in_rs_max: searchParams.get("value_in_rs_max") || "",
    published_date_after: searchParams.get("published_date_after") || "",
    published_date_before: searchParams.get("published_date_before") || "",
    // closing_date_after: searchParams.get("published_date_after") || "",
    // published_date_before: searchParams.get("published_date_before") || "",
  });
  const [dateOption, setDateOption] = useState("");
  const queryString = useQueryParams(filters);
  console.log(queryString);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  // hooks
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStatesList());
    dispatch(GetOrgList());
  }, []);
  useEffect(() => {
    const keywords = searchParams.get("keywords") || "";
    const stateIDS = searchParams.getAll("states") || [];
    const districtIds = searchParams.getAll("districts") || [];
    const organisationIds = searchParams.getAll("organisations") || [];
    const value_in_rs_min = searchParams.get("value_in_rs_min") || "";
    const value_in_rs_max = searchParams.get("value_in_rs_max") || "";
    const published_date_after = searchParams.get("published_date_after") || "";
    const published_date_before =
      searchParams.get("published_date_before") || "";
    console.log(
      "PARAMS:",
      keywords,
      stateIDS,
      districtIds,
      value_in_rs_min,
      value_in_rs_max,
      published_date_after,
      published_date_before
    );

    // Map district IDs to district objects
    const districts = districtIds
      .map((id) => {
        const district = districtsData.find((d) => d.id === parseInt(id)); // Convert id to number
        return district ? district : null;
      })
      .filter(Boolean); // Remove null values
    const states = stateIDS
      .map((id) => {
        const state = statesData.find((d) => d.id === parseInt(id)); // Convert id to number
        return state ? state : null;
      })
      .filter(Boolean); // Remove null values
    const organisations = organisationIds
      .map((id) => {
        const org = orgData.find((d) => d.id === parseInt(id)); // Convert id to number
        return org ? org : null;
      })
      .filter(Boolean); // Remove null values

    // Update filters state
    setFilters({
      keywords,
      states,
      districts,
      organisations,
      value_in_rs_min,
      value_in_rs_max,
      published_date_after,
      published_date_before,
    });

    // console.log("Mapped Districts:", districts);

    // Dispatch actions to filter data based on URL parameters
    if (
      keywords ||
      states.length ||
      districts.length ||
      organisations.length ||
      value_in_rs_max ||
      value_in_rs_min ||
      published_date_after ||
      published_date_before
    ) {
      dispatch(GetTenderListWithFilters(queryString));
    } else {
      dispatch(GetTenderList());
    }
  }, [searchParams, dispatch, districtsData, statesData]);

  useEffect(() => {
    // dispatch(GetTenderList());
    dispatch(GetDistrictsList(29));
  }, []);

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

  const handleReset = (name) => {
    if (name === "dates") {
      setFilters((prev) => ({
        ...prev,
        published_date_after: "",
        published_date_before: "",
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: Array.isArray(filters[name]) ? "" : [],
      }));
    }
  };

  const handleFilterSelection = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Array.isArray(value) ? value : [value], // Ensure array format for multiple values
    }));
  };
  const handleFilterSaved = () => {
    handleClose();

    // Update the URL without refreshing the page
    navigate(`?${queryString}`, { replace: true });
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
    <>
      <Backdrop
        sx={(theme) => ({
          color: "#0554f29e",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={tenderIsLoading || isDistrictCallLoading}
      >
        <CircularProgress color="#0554f2" />
      </Backdrop>
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
            <span className="relative left-8 z-0">
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
            {/* Keywords */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="Keywords"
                variant="contained"
                onClick={(event) => handleClick(event, "Keywords")}
              >
                Keywords {filters.keywords ? "(1)" : null}
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
                <Divider />
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
            {/* Organization */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="organisations"
                variant="contained"
                onClick={(event) => handleClick(event, "organisations")}
              >
                Organisations
                {filters?.organisations?.length
                  ? `(${filters?.organisations?.length})`
                  : null}
              </Button>
              <Popover
                id="organisations"
                open={openPopoverId === "organisations"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                  style: {
                    width: "300px",
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Organisations</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex justify-between items-center p-2">
                  <Autocomplete
                    multiple
                    id="districts-autocomplete"
                    options={orgData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name} // No optional chaining needed
                    value={filters.organisations} // Array of selected organisation objects
                    onChange={(event, newValue) => {
                      setFilters((prev) => ({
                        ...prev,
                        organisations: newValue, // Update the correct state key
                      }));
                    }}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      );
                    }}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select organisation"
                        placeholder="Choose organisation"
                      />
                    )}
                  />
                </div>
                <div className="flex justify-around pb-3">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("districts")}
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
              </Popover>
            </div>
            {/* States */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="states"
                variant="contained"
                onClick={(event) => handleClick(event, "states")}
              >
                State
                {filters?.states?.length
                  ? `(${filters?.states?.length})`
                  : null}
              </Button>
              <Popover
                id="states"
                open={openPopoverId === "states"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                  style: {
                    width: 450,
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">States</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex justify-between items-center p-2">
                  <FormControl sx={{ m: 1, width: 400 }}>
                    <Autocomplete
                      multiple
                      id="states-autocomplete"
                      options={statesData} // Pass states list
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name} // Show state names
                      value={filters.states} // Set selected states
                      onChange={(event, newValue) => {
                        setFilters((prev) => ({
                          ...prev,
                          states: newValue, // Store only state IDs
                        }));
                      }}
                      renderOption={(props, option, { selected }) => {
                        console.log(selected);

                        const { key, ...optionProps } = props;
                        return (
                          <li key={key} {...optionProps}>
                            <Checkbox
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.name}
                          </li>
                        );
                      }}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select States"
                          placeholder="Choose states"
                        />
                      )}
                    />
                  </FormControl>
                </div>
                <div className="flex justify-around pb-3">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("states")}
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
              </Popover>
            </div>
            {/* Districts */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="districts"
                variant="contained"
                onClick={(event) => handleClick(event, "districts")}
              >
                Districts
                {filters?.districts?.length
                  ? `(${filters?.districts?.length})`
                  : null}
              </Button>
              <Popover
                id="districts"
                open={openPopoverId === "districts"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                  style: {
                    width: "300px",
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Districts</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex justify-between items-center p-2">
                  <Autocomplete
                    multiple
                    id="districts-autocomplete"
                    options={districtsData}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    value={filters.districts} // Pass the full array of selected district objects
                    onChange={(event, newValue) => {
                      setFilters((prev) => ({
                        ...prev,
                        districts: newValue, // Store the full array of selected district objects
                      }));
                    }}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      );
                    }}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Districts"
                        placeholder="Choose districts"
                      />
                    )}
                  />
                </div>
                <div className="flex justify-around pb-3">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("districts")}
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
              </Popover>
            </div>
            {/* Tender Amount */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="tenderAmount"
                variant="contained"
                onClick={(event) => handleClick(event, "tenderAmount")}
              >
                Tender Amount
                {filters?.value_in_rs_max || filters?.value_in_rs_min
                  ? "(1)"
                  : null}
              </Button>
              <Popover
                id="tenderAmount"
                open={openPopoverId === "tenderAmount"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                  style: {
                    width: "400px",
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Tender Amount</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex flex-col gap-4 justify-between items-center p-2">
                  <Autocomplete
                    sx={{ width: 300 }}
                    options={amountOptions.filter(
                      (opt) =>
                        !filters.value_in_rs_max ||
                        Number(opt.value) < Number(filters.value_in_rs_max)
                    )}
                    getOptionLabel={(option) => option.label}
                    value={
                      amountOptions.find(
                        (opt) => opt.value === filters.value_in_rs_min
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newMinAmount = newValue ? newValue.value : "";

                      // Ensure maxAmount is greater than or equal to minAmount
                      const newMaxAmount =
                        filters?.value_in_rs_max &&
                        newMinAmount > filters?.value_in_rs_max
                          ? newMinAmount // Auto-adjust maxAmount
                          : filters?.value_in_rs_max;

                      setFilters((prev) => ({
                        ...prev,
                        value_in_rs_min: newMinAmount,
                        value_in_rs_max: newMaxAmount,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Minimum Amount"
                        placeholder="Select min amount"
                      />
                    )}
                  />

                  {/* Max Amount Autocomplete */}
                  <Autocomplete
                    sx={{ width: 300 }}
                    options={amountOptions.filter(
                      (opt) =>
                        !filters.value_in_rs_min ||
                        Number(opt.value) > Number(filters.value_in_rs_min)
                    )}
                    getOptionLabel={(option) => option.label}
                    value={
                      amountOptions.find(
                        (opt) => opt.value === filters.value_in_rs_max
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newMaxAmount = newValue ? newValue.value : "";

                      // Ensure minAmount is less than or equal to maxAmount
                      const newMinAmount =
                        filters?.value_in_rs_min &&
                        newMaxAmount < filters?.value_in_rs_min
                          ? newMaxAmount // Auto-adjust minAmount
                          : filters?.value_in_rs_min;

                      setFilters((prev) => ({
                        ...prev,
                        value_in_rs_max: newMaxAmount,
                        value_in_rs_min: newMinAmount,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Maximum Amount"
                        placeholder="Select max amount"
                      />
                    )}
                  />
                </div>
                <div className="flex justify-around pb-3">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("districts")}
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
              </Popover>
            </div>
            {/*Published Date*/}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button
                  style={{
                    backgroundColor: "#0554f2",
                  }}
                  aria-describedby="datePicker"
                  variant="contained"
                  onClick={(event) => handleClick(event, "datePicker")}
                >
                  Published Date
                  {filters?.published_date_after ||
                  filters?.published_date_before
                    ? "(1)"
                    : null}
                </Button>
                <Popover
                  id="datePicker"
                  open={openPopoverId === "datePicker"}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  PaperProps={{
                    style: {
                      width: "400px",
                    },
                  }}
                >
                  <div className="w-full flex justify-between items-center p-2">
                    <label className="pl-2">Published Date</label>
                    <CloseBTN />
                  </div>
                  <Divider />
                  <div className="w-full flex flex-col gap-4 justify-between items-center p-2">
                    <TextField
                      style={{
                        width: 300,
                      }}
                      select
                      label="Date Option"
                      value={dateOption}
                      onChange={(e) => {
                        const selectedOption = e.target.value;
                        let published_date_after = "";
                        let published_date_before = "";

                        // Set published_date_after and published_date_before based on the selected option
                        const today = new Date();
                        switch (selectedOption) {
                          case "today":
                            published_date_after = today
                              .toISOString()
                              .split("T")[0];
                            published_date_before = today
                              .toISOString()
                              .split("T")[0];
                            break;
                          case "7days":
                            published_date_after = new Date(
                              today.setDate(today.getDate() - 7)
                            )
                              .toISOString()
                              .split("T")[0];
                            published_date_before = new Date()
                              .toISOString()
                              .split("T")[0];
                            break;
                          case "15days":
                            published_date_after = new Date(
                              today.setDate(today.getDate() - 15)
                            )
                              .toISOString()
                              .split("T")[0];
                            published_date_before = new Date()
                              .toISOString()
                              .split("T")[0];
                            break;
                          default:
                            break;
                        }

                        setFilters((prev) => ({
                          ...prev,
                          published_date_after,
                          published_date_before,
                        }));

                        setDateOption(selectedOption);
                      }}
                    >
                      {dateOptions?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* From Date Picker */}

                    <DatePicker
                      label="From Date"
                      value={
                        filters.published_date_after
                          ? dayjs(filters.published_date_after)
                          : null
                      }
                      onChange={(newValue) => {
                        setFilters((prev) => ({
                          ...prev,
                          published_date_after: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                    />
                    {/* To Date Picker */}

                    <DatePicker
                      label="To Date"
                      value={
                        filters.published_date_before
                          ? dayjs(filters?.published_date_before)
                          : null
                      }
                      onChange={(newValue) => {
                        setFilters((prev) => ({
                          ...prev,
                          published_date_before: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                    />
                  </div>
                  <div className="flex justify-around pb-3">
                    <button
                      className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                      onClick={() => handleReset("dates")}
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
                </Popover>
              </LocalizationProvider>
            </div>
            {/*Closing Date*/}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button
                  style={{
                    backgroundColor: "#0554f2",
                  }}
                  aria-describedby="datePickerclosing"
                  variant="contained"
                  onClick={(event) => handleClick(event, "datePickerclosing")}
                >
                  Closing Date
                  {filters?.published_date_after ||
                  filters?.published_date_before
                    ? "(1)"
                    : null}
                </Button>
                <Popover
                  id="datePickerclosing"
                  open={openPopoverId === "datePickerclosing"}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  PaperProps={{
                    style: {
                      width: "400px",
                    },
                  }}
                >
                  <div className="w-full flex justify-between items-center p-2">
                    <label className="pl-2">Closing Date</label>
                    <CloseBTN />
                  </div>
                  <Divider />
                  <div className="w-full flex flex-col gap-4 justify-between items-center p-2">
                    <TextField
                      style={{
                        width: 300,
                      }}
                      select
                      label="Date Option"
                      value={dateOption}
                      onChange={(e) => {
                        const selectedOption = e.target.value;
                        let published_date_after = "";
                        let published_date_before = "";

                        // Set published_date_after and published_date_before based on the selected option
                        const today = new Date();
                        switch (selectedOption) {
                          case "today":
                            published_date_after = today
                              .toISOString()
                              .split("T")[0];
                            published_date_before = today
                              .toISOString()
                              .split("T")[0];
                            break;
                          case "7days":
                            published_date_after = new Date(
                              today.setDate(today.getDate() - 7)
                            )
                              .toISOString()
                              .split("T")[0];
                            published_date_before = new Date()
                              .toISOString()
                              .split("T")[0];
                            break;
                          case "15days":
                            published_date_after = new Date(
                              today.setDate(today.getDate() - 15)
                            )
                              .toISOString()
                              .split("T")[0];
                            published_date_before = new Date()
                              .toISOString()
                              .split("T")[0];
                            break;
                          default:
                            break;
                        }

                        setFilters((prev) => ({
                          ...prev,
                          published_date_after,
                          published_date_before,
                        }));

                        setDateOption(selectedOption);
                      }}
                    >
                      {dateOptions?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* From Date Picker */}

                    <DatePicker
                      label="From Date"
                      value={
                        filters.published_date_after
                          ? dayjs(filters.published_date_after)
                          : null
                      }
                      onChange={(newValue) => {
                        setFilters((prev) => ({
                          ...prev,
                          published_date_after: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                    />
                    {/* To Date Picker */}

                    <DatePicker
                      label="To Date"
                      value={
                        filters.published_date_before
                          ? dayjs(filters?.published_date_before)
                          : null
                      }
                      onChange={(newValue) => {
                        setFilters((prev) => ({
                          ...prev,
                          published_date_before: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                    />
                  </div>
                  <div className="flex justify-around pb-3">
                    {/* hover:bg-[#fff] hover:text-[#0554F2] */}
                    <button
                      className="flex gap-4 p-2 bg-gray-400 rounded-md text-white text-base font-medium
                     transition-all duration-300 ease-in-out "
                      onClick={() => handleReset("dates")}
                      disabled
                    >
                      Reset
                    </button>
                    {/* hover:bg-[#fff] hover:text-[#0554F2] */}
                    <button
                      className="flex gap-4 p-2 bg-gray-400 rounded-md text-white text-base font-medium
                    transition-all duration-300 ease-in-out "
                      onClick={handleFilterSaved}
                      disabled
                    >
                      Apply
                    </button>
                  </div>
                </Popover>
              </LocalizationProvider>
            </div>
          </div>
          {tenderData?.results?.map((tender, i) => (
            <div
              key={tender?.uid}
              className={`flex flex-col md:flex-row w-full justify-between ${
                i % 2 === 0 ? "bg-white" : "bg-[#e2ecff]"
              } py-6  pl-4 rounded-md gap-4`}
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
                <div className="flex w-full justify-start items-center overflow-hidden text-ellipsis line-clamp-2">
                  <LocationOnIcon fontSize="small" />
                  <p className="text-sm font-thin">{tender?.location}</p>
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
                    {tender?.value_in_rs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
