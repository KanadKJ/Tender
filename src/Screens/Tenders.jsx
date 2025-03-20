import React, { useEffect, useRef, useState } from "react";
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
  Pagination,
  Popover,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  amountOptions,
  dateDifferenceCalculator,
  dateOptions,
  formatDateTime,
  formatIndianCurrency,
} from "../Utils/CommonUtils";
import {
  GetDistrictsList,
  GetDivList,
  GetDrpList,
  GetOrgList,
  GetSectionList,
  GetStatesList,
  GetSubDivList,
  GetUnitList,
} from "../Redux/Slices/CommonSlice";
import useQueryParams from "../Hooks/useQueryParams";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomBadge from "../Components/CustomBadge";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LightbulbCircleOutlinedIcon from "@mui/icons-material/LightbulbCircleOutlined";
export default function Tenders() {
  // redux
  const { tenderData, tenderIsLoading } = useSelector((s) => s.tender);

  const {
    isDistrictCallLoading,
    districtsData,
    statesData,
    orgData,
    drpData,
    divData,
    subDivData,
    sectionsData,
    unitData,
  } = useSelector((s) => s.common);
  //state
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [savedFilters, setSavedFilters] = useState([
    {
      name: "Saved 1",
      filterLink: "state=29",
    },
    {
      name: "Saved 2",
      filterLink: "states=29&keywords=LED",
    },
    {
      name: "Saved 3",
      filterLink: "state=29&keywords=water&ordering=published_date",
    },
    {
      name: "Saved 3",
      filterLink: "state=29",
    },
  ]);

  const [saveFilter, setSaveFilter] = useState("");
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
    departments:
      searchParams
        .getAll("departments")
        ?.map((id) => {
          const department = drpData?.find((d) => d.id === parseInt(id));
          return department ? department : null;
        })
        .filter(Boolean) || [],
    divisions:
      searchParams
        .getAll("divisions")
        ?.map((id) => {
          const division = divData?.find((d) => d.id === parseInt(id));
          return division ? division : null;
        })
        .filter(Boolean) || [],
    sub_divisions:
      searchParams
        .getAll("sub_divisions")
        ?.map((id) => {
          const subdiv = subDivData?.find((d) => d.id === parseInt(id));
          return subdiv ? subdiv : null;
        })
        .filter(Boolean) || [],
    units:
      searchParams
        .getAll("units")
        ?.map((id) => {
          const unit = unitData?.find((d) => d.id === parseInt(id));
          return unit ? unit : null;
        })
        .filter(Boolean) || [],
    value_in_rs_min: searchParams.get("value_in_rs_min") || "",
    sections:
      searchParams
        .getAll("sections")
        ?.map((id) => {
          const section = sectionsData?.find((d) => d.id === parseInt(id));
          return section ? section : null;
        })
        .filter(Boolean) || [],
    value_in_rs_max: searchParams.get("value_in_rs_max") || "",
    published_date_after: searchParams.get("published_date_after") || "",
    published_date_before: searchParams.get("published_date_before") || "",
    ordering: searchParams.getAll("ordering") || [],
    limit: searchParams.get("limit") || [],
    offset: searchParams.get("offset") || [],
    // closing_date_after: searchParams.get("published_date_after") || "",
    // published_date_before: searchParams.get("published_date_before") || "",
  });
  const [dateOption, setDateOption] = useState("");
  const queryString = useQueryParams(filters);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [page, setPage] = useState(1);
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
    const departmentIds = searchParams.getAll("departments") || [];
    const divisionIds = searchParams.getAll("divisions") || [];
    const sub_divisionsIds = searchParams.getAll("sub_divisions") || [];
    const sectionsIds = searchParams.getAll("sections") || [];
    const ordering = searchParams.getAll("ordering") || [];
    const value_in_rs_min = searchParams.get("value_in_rs_min") || "";
    const value_in_rs_max = searchParams.get("value_in_rs_max") || "";
    const published_date_after = searchParams.get("published_date_after") || "";
    const published_date_before =
      searchParams.get("published_date_before") || "";
    const offset = searchParams.get("offset") || "";
    const limit = searchParams.get("limit") || "";
    const districts = districtIds
      .map((id) => {
        const dt = districtsData.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const states = stateIDS
      .map((id) => {
        const dt = statesData.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const organisations = organisationIds
      .map((id) => {
        const dt = orgData.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const departments = departmentIds
      .map((id) => {
        const dt = drpData?.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const divisions = divisionIds
      .map((id) => {
        const dt = divData?.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const sub_divisions = sub_divisionsIds
      .map((id) => {
        const dt = subDivData?.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    const sections = sectionsIds
      .map((id) => {
        const dt = sectionsData?.find((d) => d.id === parseInt(id)); // Convert id to number
        return dt ? dt : null;
      })
      .filter(Boolean); // Remove null values
    setFilters({
      states,
      sections,
      keywords,
      ordering,
      districts,
      divisions,
      departments,
      sub_divisions,
      organisations,
      value_in_rs_min,
      value_in_rs_max,
      published_date_after,
      published_date_before,
      limit,
      offset,
    });
    if (
      keywords ||
      sections ||
      states.length ||
      districts.length ||
      divisions.length ||
      sub_divisions.length ||
      organisations.length ||
      departments.length ||
      value_in_rs_max ||
      value_in_rs_min ||
      published_date_after ||
      published_date_before ||
      ordering.length ||
      limit ||
      offset
    ) {
      dispatch(GetTenderListWithFilters(queryString));
      dispatch(GetDrpList(organisations));
      dispatch(GetDivList(departments));
      dispatch(GetSubDivList(divisions));
    } else {
      dispatch(GetTenderList());
    }
  }, [
    searchParams,
    districtsData,
    statesData,
    orgData,
    tenderData?.next,
    page,
    filters?.offset,
    saveFilter,
  ]);
  useEffect(() => {
    dispatch(GetDistrictsList(29));
  }, []);
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
      [name]: Array.isArray(value) ? value : [value],
    }));
    console.log(name, value);
  };
  const handleFilterSaved = () => {
    handleClose();
    navigate(`?${queryString}`, { replace: true });
  };
  const handleOrderingChange = (event, newValue) => {
    setFilters((prev) => {
      let newOrdering = [...prev.ordering];
      if (!newValue) {
        newOrdering = newOrdering.filter(
          (item) => !item.includes(event.target.value.replace("-", ""))
        );
      } else {
        const field = newValue.replace("-", "");
        newOrdering = newOrdering.filter((item) => !item.includes(field));
        newOrdering.push(newValue);
      }
      return { ...prev, ordering: newOrdering };
    });
  };
  const CloseBTN = () => {
    return (
      <IconButton onClick={handleClose} size="small">
        <svg
          xmlns="http://www.w3.dt/2000/svg"
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
  const handleChangePages = (event, value) => {
    const params = new URLSearchParams(searchParams);
    const newOffset = (value - 1) * 50; // Corrected calculation
    if (!newOffset) {
      params.set("offset", "");
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      params.set("offset", newOffset);
      navigate(`?${params.toString()}`, { replace: true });

      setFilters((prev) => ({
        ...prev,
        offset: newOffset,
      }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSaveFiltersSearched = () => {
    if (!saveFilter.trim()) {
      handleClose();

      return;
    }

    const params = new URLSearchParams(searchParams).toString();

    setSavedFilters((prevFilters) => [
      ...prevFilters,
      { name: saveFilter, filterLink: params },
    ]);

    setSaveFilter("");
    handleClose();
  };
  const handleSavedSeachFromTemplate = (obj) => {
    console.log(obj);

    navigate(`?${obj?.filterLink}`, { replace: true });
    handleClose();
  };
  const dataFetcher = (type, ids) => {
    if (type === "organization") {
      dispatch(GetDrpList(ids));
    }
    if (type === "department") {
      dispatch(GetDivList(ids));
    }
    if (type === "division") {
      dispatch(GetSubDivList(ids));
    }
    if (type === "sub_divisions") {
      dispatch(GetSectionList(ids));
    }
    if (type === "sections") {
      dispatch(GetUnitList(ids));
    }
  };
  return (
    <>
      <div className="mt-14 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40">
        <Background type="vector" lifed="up" show="no" />
        <main className="w-full flex flex-col justify-center items-center gap-6">
          <div className="mt-6 flex flex-col gap-3 w-full justify-center items-center">
            <div className="w-full flex  justify-center items-center">
              <h1 className="font-normal text-5xl text-start">
                Tenders at a glance
              </h1>
            </div>
            <div className="w-full flex  justify-center items-center">
              <h3 className="font-normal text-xl text-start">
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
            {/* Save filter */}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="SavedFilters"
                variant="contained"
                onClick={(event) => handleClick(event, "SavedFilters")}
              >
                Save Filters
                <CustomBadge data={savedFilters} />
              </Button>
              <Popover
                id="SavedFilters"
                open={openPopoverId === "SavedFilters"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Save Filter</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="p-5 flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Filter Name"
                    name="keywords"
                    value={saveFilter}
                    onChange={(e) => setSaveFilter(e.target.value)}
                    className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none p-2 rounded-md"
                  />
                  <h1>Saved Filters</h1>
                  <div className="w-full flex flex-col max-h-36 overflow-y-auto scrollbar-hide">
                    {savedFilters.length ? (
                      savedFilters.map((f, i) => (
                        <button
                          key={i}
                          className="w-full border shadow-md cursor-pointer p-3 my-2"
                          onClick={() => handleSavedSeachFromTemplate(f)}
                        >
                          <h1>{f.name}</h1>
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">
                        No saved filters
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-around mb-3">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleSaveFiltersSearched}
                  >
                    Save Filter
                  </button>
                </div>
              </Popover>
            </div>
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
                Keywords
                {filters.keywords && (
                  <CustomBadge data={filters.keywords ? ["1"] : null} />
                )}
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
                <CustomBadge data={filters?.organisations} />
              </Button>
              <Popover
                id="organisations"
                open={openPopoverId === "organisations"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                PaperProps={{
                  sx: {
                    width: "300px", // Adjust as needed
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Organisations</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex flex-col gap-4 justify-between items-center p-2">
                  {/* ORG */}
                  <Autocomplete
                    multiple
                    id="organization-autocomplete"
                    limitTags={1}
                    options={orgData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name} // No optional chaining needed
                    value={orgData.filter((d) =>
                      filters?.organisations?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        orgData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        organisations: validData,
                      }));

                      dataFetcher("organization", validData);
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select organisation"
                        placeholder="Choose organisation"
                      />
                    )}
                  />
                  {/* DEP */}
                  <Autocomplete
                    disabled={!filters?.organisations?.length}
                    multiple
                    limitTags={1}
                    id="Department-autocomplete"
                    options={drpData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name} // No optional chaining needed
                    value={drpData.filter((d) =>
                      filters?.departments?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        drpData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        departments: validData,
                      }));

                      dataFetcher("department", validData);
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Department"
                        placeholder="Choose Department"
                      />
                    )}
                  />
                  {/* DIV */}
                  <Autocomplete
                    limitTags={1}
                    disabled={!filters?.departments?.length}
                    multiple
                    id="division-autocomplete"
                    options={divData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name} // No optional chaining needed
                    value={divData.filter((d) =>
                      filters?.divisions?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        divData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        divisions: validData,
                      }));

                      dataFetcher("division", validData);
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Division"
                        placeholder="Choose Division"
                      />
                    )}
                  />
                  {/*SUB DIV */}
                  <Autocomplete
                    limitTags={1}
                    disabled={!filters?.divisions?.length}
                    multiple
                    id="sub_divisions-autocomplete"
                    options={subDivData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name} // No optional chaining needed
                    value={subDivData.filter((d) =>
                      filters?.sub_divisions?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        subDivData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        sub_divisions: validData,
                      }));

                      dataFetcher("sub_divisions", validData);
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Sub Division"
                        placeholder="Choose Sub Division"
                      />
                    )}
                  />
                  {/*Sections */}
                  <Autocomplete
                    limitTags={1}
                    disabled={!filters?.sub_divisions?.length}
                    multiple
                    id="sections-autocomplete"
                    options={sectionsData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name} // No optional chaining needed
                    value={sectionsData.filter((d) =>
                      filters?.sections?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        sectionsData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        sections: validData,
                      }));

                      dataFetcher("sections", validData);
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Section"
                        placeholder="Choose Sections"
                      />
                    )}
                  />
                  {/*Units */}
                  <Autocomplete
                    limitTags={1}
                    disabled={!filters?.sections?.length}
                    multiple
                    id="units-autocomplete"
                    options={unitData} // Array of objects with `id` and `name`
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name} // No optional chaining needed
                    value={unitData.filter((d) =>
                      filters?.units?.some((dep) => dep.id === d.id)
                    )} // Ensure objects match by reference
                    onChange={(event, newValue) => {
                      const validData = newValue.filter((dep) =>
                        unitData.some((d) => d.id === dep.id)
                      );

                      setFilters((prev) => ({
                        ...prev,
                        units: validData,
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
                    style={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select units"
                        placeholder="Choose units"
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
                <CustomBadge data={filters?.states} />
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
                <CustomBadge data={filters?.districts} />
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
                <CustomBadge data={filters.value_in_rs_max ? ["1"] : null} />
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
                  <CustomBadge
                    data={
                      filters?.published_date_after ||
                      filters?.published_date_before
                        ? ["1"]
                        : null
                    }
                  />
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
                  <CustomBadge
                    data={
                      filters?.published_date_after ||
                      filters?.published_date_before
                        ? ["1"]
                        : null
                    }
                  />
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
            {/*Sort*/}
            <div>
              <Button
                style={{
                  backgroundColor: "#0554f2",
                }}
                aria-describedby="sort"
                variant="contained"
                onClick={(event) => handleClick(event, "sort")}
              >
                <FilterAltIcon />
                Sort
                <CustomBadge data={filters?.ordering} />
              </Button>
              <Popover
                id="sort"
                open={openPopoverId === "sort"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                  style: {
                    width: "550px",
                  },
                }}
              >
                <div className="w-full flex justify-between items-center p-2">
                  <label className="pl-2">Sort</label>
                  <CloseBTN />
                </div>
                <Divider />
                <div className="w-full flex flex-col gap-4 justify-between items-center px-4 py-2">
                  {/* Published Date */}
                  <div className="w-full flex gap-6 justify-between items-center">
                    <h1 className="w-1/3 text-base font-medium text-start">
                      Published Date
                    </h1>
                    <ToggleButtonGroup
                      color="primary"
                      value={
                        filters.ordering.find((o) =>
                          o.includes("published_date")
                        ) || null
                      }
                      exclusive
                      onChange={handleOrderingChange}
                      aria-label="Platform"
                      sx={{ width: "100%" }}
                    >
                      <ToggleButton
                        sx={{ width: "100%" }}
                        value="published_date"
                      >
                        Ascending
                      </ToggleButton>
                      <ToggleButton
                        sx={{ width: "100%" }}
                        value="-published_date"
                      >
                        Descending
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  {/* Closing Date */}
                  <div className="w-full flex gap-6 justify-between items-center">
                    <h1 className="w-1/3 text-base font-medium text-start">
                      Closing Date
                    </h1>
                    <ToggleButtonGroup
                      color="primary"
                      // value={
                      //   filters.ordering.find((o) =>
                      //     o.includes("published_date")
                      //   ) || null
                      // }
                      exclusive
                      // onChange={handleOrderingChange}
                      aria-label="Platform"
                      sx={{ width: "100%" }}
                    >
                      <ToggleButton sx={{ width: "100%" }} value="" disabled>
                        Ascending
                      </ToggleButton>
                      <ToggleButton sx={{ width: "100%" }} value="" disabled>
                        Descending
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  {/*   Tender Amount */}
                  <div className="w-full flex gap-6 justify-between items-center">
                    <h1 className="w-1/3 text-base font-medium text-start">
                      Tender Amount
                    </h1>
                    <ToggleButtonGroup
                      color="primary"
                      value={
                        filters.ordering.find((o) =>
                          o.includes("value_in_rs")
                        ) || null
                      }
                      exclusive
                      onChange={handleOrderingChange}
                      aria-label="Platform"
                      sx={{ width: "100%" }}
                    >
                      <ToggleButton sx={{ width: "100%" }} value="value_in_rs">
                        Low to High
                      </ToggleButton>
                      <ToggleButton sx={{ width: "100%" }} value="-value_in_rs">
                        High to Low
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  {/* Awarded Date */}
                  <div className="w-full flex gap-6 justify-between items-center">
                    <h1 className="w-1/3 text-base font-medium text-start">
                      Awarded Date
                    </h1>
                    <ToggleButtonGroup
                      color="primary"
                      // value={
                      //   filters.ordering.find((o) =>
                      //     o.includes("published_date")
                      //   ) || null
                      // }
                      exclusive
                      // onChange={handleOrderingChange}
                      aria-label="Platform"
                      sx={{ width: "100%" }}
                    >
                      <ToggleButton sx={{ width: "100%" }} value="" disabled>
                        Ascending
                      </ToggleButton>
                      <ToggleButton sx={{ width: "100%" }} value="" disabled>
                        Descending
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
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
            </div>
          </div>
          <div>
            {tenderIsLoading ? (
              <div className="h-[20vh]"></div>
            ) : (
              tenderData?.results?.map((tender, i) => {
                const { diffDays, col } = dateDifferenceCalculator(
                  tender?.published_date,
                  tender?.bid_submission_end_date
                );

                const corrigendum = dateDifferenceCalculator(
                  tender?.corrigendum?.published_date,
                  new Date().toISOString().slice(0, 19)
                );

                return (
                  <div
                    key={tender?.uid}
                    className={`flex flex-col md:flex-row w-full justify-between ${
                      i % 2 === 0 ? "bg-white" : "bg-[#e2ecff]"
                    } py-6  pl-4 rounded-md gap-4 min-h-56`}
                  >
                    <div className="w-full flex flex-col gap-5">
                      <div className="flex gap-4 flex-col ">
                        <div>
                          <h1 className="text-base font-semibold">
                            {tender?.id}|{tender?.organisation_chain}
                          </h1>
                        </div>
                        <div className="flex w-full justify-start items-center overflow-hidden text-ellipsis line-clamp-2">
                          <LocationOnIcon fontSize="small" />
                          <p className="text-sm font-thin">
                            {tender?.location}
                          </p>
                        </div>
                        <div>
                          <span className="p-1 bg-[#EAEAEA] text-xs rounded-md">
                            {tender?.product_category}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden text-ellipsis line-clamp-2 text-base">
                        <p>{tender?.description}</p>
                      </div>

                      <div className="flex justify-start items-center gap-4">
                        <button
                          onClick={() => navigate(`/tenders/${tender?.uid}`)}
                          className="flex gap-2 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
                group"
                        >
                          View
                          <span className="flex justify-center items-center">
                            <VisibilityOutlinedIcon fontSize="sm" />
                          </span>
                        </button>
                        <button
                          className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                      hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                        >
                          <FavoriteBorderOutlinedIcon />
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                      <div className="flex gap-4 justify-around">
                        <div className="p-2 shadow-sm bg-[#EBCF1326] rounded-lg flex gap-4 justify-between items-center">
                          <LightbulbCircleOutlinedIcon
                            fontSize="sm"
                            color="primary"
                          />
                          <h1 className="text-sm font-semibold">
                            Corrigendum : NIT{" "}
                          </h1>
                          {corrigendum?.diffDays ? (
                            <h1 className="text-[#C9B00F] text-center text-sm">
                              {corrigendum?.diffDays} days ago
                            </h1>
                          ) : (
                            <h1 className="text-[#C9B00F] text-center text-sm">
                              -
                            </h1>
                          )}
                        </div>

                        <div className="flex flex-col justify-center items-center ">
                          <span
                            className={` rounded-md text-[${col}] text-lg font-extrabold `}
                          >
                            {diffDays}
                          </span>
                          <span
                            className={`text-xs text-[${col}] rounded-md text-center font-medium`}
                          >
                            Days left
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex gap-4 justify-center items-center">
                        <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24">
                          <h6 className="text-sm font-normal text-[#565656]">
                            Published Date
                          </h6>
                          <p className="text-[#212121] text-base font-medium">
                            {formatDateTime(tender?.published_date)[0]} <br />
                            {formatDateTime(tender?.published_date)[1]}
                          </p>
                        </div>
                        <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24">
                          <h6 className="text-sm font-normal text-[#565656]">
                            Closing Date
                          </h6>

                          <p className="text-[#212121] text-base font-medium">
                            {formatDateTime(tender?.bid_submission_end_date)[0]}{" "}
                            <br />
                            {formatDateTime(tender?.bid_submission_end_date)[1]}
                          </p>
                        </div>
                        <div className="px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24">
                          <h6 className="text-sm font-normal text-[#565656]">
                            Tender Amount
                          </h6>
                          <p className="text-[#212121] text-base font-medium">
                            {tender?.value_in_rs
                              ? formatIndianCurrency(tender?.value_in_rs)
                              : "Refer Document"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
        <div className="flex justify-center items-center mt-14 border p-4 rounded-full shadow-md">
          <Pagination
            count={Math.ceil(tenderData?.count / 50) || 1}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={1}
            color="primary"
            showFirstButton
            onChange={handleChangePages}
            page={filters?.offset / 50 + 1} // Fixed calculation
          />
        </div>
      </div>
    </>
  );
}
