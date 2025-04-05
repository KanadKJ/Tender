import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTemplate,
  GetDocumentURL,
  GetOrInsertTenderWishlist,
  GetTemplateDetails,
  GetTenderListWithFilters,
  InsertTemplate,
} from "../Redux/Slices/TenderSlice";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  amountOptions,
  dateDifferenceCalculator,
  dateOptions,
  formatDateTime,
  formatIndianCurrency,
  handleDownload,
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
import { toast } from "react-toastify";
export default function TenderPer() {
  // redux
  const { tenderData, tenderIsLoading, userSaverTemplates } = useSelector(
    (s) => s.tender
  );

  const {
    districtsData,
    statesData,
    orgData,
    drpData,
    divData,
    subDivData,
    sectionsData,
    unitData,
  } = useSelector((s) => s.common);
  const { userData, userFilters } = useSelector((s) => s.auth);
  const [isPlanExpired, setIsPlanExpired] = useState(false);
  const [allGood, setAllGood] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (userFilters?.ExpiryDate) {
      const expiryDate = new Date(userFilters.ExpiryDate);
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        setIsPlanExpired(true);
      } else {
        setIsPlanExpired(false);
      }
    }
  }, [userFilters]);
  //state
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [savedFilters, setSavedFilters] = useState([]);

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
    pincode: searchParams.get("pincode") || "",
    bidding_status: searchParams.get("bidding_status") || "",
    // closing_date_after: searchParams.get("published_date_after") || "",
    // published_date_before: searchParams.get("published_date_before") || "",
  });
  // const [userFilters, setUserFilters] = useState({});
  // const [newDist, setNewDist] = useState({});
  const [dateOption, setDateOption] = useState("");
  const queryString = useQueryParams(filters);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);

  // hooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDistrictsList(29));
    dispatch(GetStatesList());
    dispatch(GetOrgList());
  }, []);
  useEffect(() => {
    if (userData) {
      dispatch(GetTemplateDetails(userData?.id));
    }
  }, [userData]);

  useEffect(() => {
    const value_in_rs_min = searchParams.get("value_in_rs_min") || "";
    const value_in_rs_max = searchParams.get("value_in_rs_max") || "";
    const published_date_after = searchParams.get("published_date_after") || "";
    const published_date_before =
      searchParams.get("published_date_before") || "";
    const offset = searchParams.get("offset") || "";
    const limit = searchParams.get("limit") || "";
    const keywords = searchParams.get("keywords") || "";
    const pincode = searchParams.get("pincode") || "";
    const bidding_status = searchParams.get("bidding_status") || "";
    const stateIDS = searchParams.getAll("states") || [];
    const districtIds = searchParams.getAll("districts") || [];
    const organisationIds = searchParams.getAll("organisations") || [];

    const departmentIds = searchParams.getAll("departments") || [];

    const divisionIds = searchParams.getAll("divisions") || [];
    const sub_divisionsIds = searchParams.getAll("sub_divisions") || [];
    const sectionsIds = searchParams.getAll("sections") || [];
    const ordering = searchParams.getAll("ordering") || [];

    const organisations = organisationIds
      .map((id) => {
        const dt = orgData.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (organisationIds.length) {
      dispatch(GetDrpList(organisations));
    }

    const departments = departmentIds
      .map((id) => {
        const dt = drpData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);

    if (departments.length) {
      dispatch(GetDivList(departments));
    }
    const divisions = divisionIds
      .map((id) => {
        const dt = divData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (divisions.length) {
      dispatch(GetSubDivList(divisions));
    }
    const sub_divisions = sub_divisionsIds
      .map((id) => {
        const dt = subDivData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (sub_divisions.length) {
      dispatch(GetSectionList(sub_divisions));
    }
    const sections = sectionsIds
      .map((id) => {
        const dt = sectionsData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (sections.length) {
      dispatch(GetUnitList(sections));
    }

    const states = stateIDS
      .map((id) => {
        const dt = statesData.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);

    console.log(states);

    const districts = districtIds
      .map((id) => {
        const dt = districtsData.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);

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
      pincode,
      bidding_status,
    });

    console.log("run end");
  }, []);

  useEffect(() => {
    const organisationIds = searchParams.getAll("organisations") || [];
    const organisations = organisationIds
      .map((id) => {
        const dt = orgData.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (organisationIds.length) {
      dispatch(GetDrpList(organisations));
    }
    setFilters({
      ...filters,
      organisations,
    });
  }, [orgData]);
  useEffect(() => {
    const departmentIds = searchParams.getAll("departments") || [];
    const departments = departmentIds
      .map((id) => {
        const dt = drpData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (departments.length) {
      dispatch(GetDivList(departments));
    }
    setFilters({
      ...filters,
      departments,
    });
  }, [drpData]);

  useEffect(() => {
    const divisionIds = searchParams.getAll("divisions") || [];
    const divisions = divisionIds
      .map((id) => {
        const dt = divData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (divisions.length) {
      dispatch(GetSubDivList(divisions));
    }
    setFilters({
      ...filters,
      divisions,
    });
  }, [divData]);
  useEffect(() => {
    const sub_divisionsIds = searchParams.getAll("sub_divisions") || [];
    const sub_divisions = sub_divisionsIds
      .map((id) => {
        const dt = subDivData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (sub_divisions.length) {
      dispatch(GetSectionList(sub_divisions));
    }
    setFilters({
      ...filters,
      sub_divisions,
    });
  }, [subDivData]);

  useEffect(() => {
    const sectionsIds = searchParams.getAll("sections") || [];
    const sections = sectionsIds
      .map((id) => {
        const dt = sectionsData?.find((d) => d.id === parseInt(id));
        return dt ? dt : null;
      })
      .filter(Boolean);
    if (sections.length) {
      dispatch(GetUnitList(sections));
    }
    setFilters({
      ...filters,
      sections,
    });
  }, [sectionsData]);

  useEffect(() => {
    dispatch(GetTenderListWithFilters(searchParams.toString()));
  }, [searchParams]);
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
  };
  const handleFilterSaved = () => {
    let errorStr = {
      error: false,
      list: [],
    };
    if (userData) {
      if (
        userFilters?.ORGANIZATION?.length &&
        filters?.organisations?.length === 0
      ) {
        errorStr.error = true;
        errorStr.list.push("Organization");
      }
      if (userFilters?.STATE?.length && filters?.states?.length === 0) {
        errorStr.error = true;
        errorStr.list.push("States");
      }
      if (userFilters?.DISTRICT?.length && filters?.district?.length === 0) {
        errorStr.error = true;
        errorStr.list.push("District");
      }
      if (
        userFilters?.DEPARTMENT?.length &&
        filters?.departments?.length === 0
      ) {
        errorStr.error = true;
        errorStr.list.push("Departments");
      }
      if (userFilters?.DIVISION?.length && filters?.divisions?.length === 0) {
        errorStr.error = true;
        errorStr.list.push("Divisions");
      }
      if (
        userFilters?.SUB_DIVISION?.length &&
        filters?.sub_divisions?.length === 0
      ) {
        errorStr.error = true;
        errorStr.list.push("Sub Divisions");
      }
      if (userFilters?.SECTION?.length && filters?.sections?.length === 0) {
        errorStr.error = true;
        errorStr.list.push("Sections");
      }
      if (userFilters?.UNIT?.length && filters?.units?.length === 0) {
        errorStr.error = true;
        errorStr.list.push("Units");
      }
      handleClose();
      if (errorStr.error) {
        toast.error(`${errorStr.list.join(",")} are/is mandatory field(s).`);
        setAllGood(errorStr?.error);
        return;
      }
    }
    errorStr.error = false;
    setAllGood(false);
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
    const newOffset = (value - 1) * 50;
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
  const handleWishList = (id) => {
    let data = {
      id: 0,
      userId: userData?.id,
      tenderId: id,
    };
    dispatch(GetOrInsertTenderWishlist(data));
  };

  const handleSaveFiltersSearched = () => {
    if (!saveFilter.trim()) {
      handleClose();
      toast.error("Please provide valid data.");
      return;
    }
    const params = new URLSearchParams(searchParams).toString();
    if (!userData) {
      toast.error("Please sign in to continue");
      return;
    }
    if (
      userSaverTemplates.some(
        (template) => template.templateName === saveFilter
      )
    ) {
      toast.error("Template name already exists");
      return;
    }

    if (userFilters?.template < userSaverTemplates?.length) {
      toast.error("Please upgrade your plan to save more templates");
      return;
    }
    dispatch(
      InsertTemplate({
        userId: userData?.id,
        url: params,
        templateName: saveFilter,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(GetTemplateDetails(userData?.id));
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong.");
      });

    setSaveFilter("");
    handleClose();
  };
  const handleDeleteSavedFiltersbyUsers = (id) => {
    dispatch(DeleteTemplate(id))
      .unwrap()
      .then(() => {
        dispatch(GetTemplateDetails(userData?.id));
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong.");
      });
  };
  const handleSavedSeachFromTemplate = (obj) => {
    navigate(`?${obj?.url}`, { replace: true });
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
  const filteredTenders = tenderData?.results?.filter(
    (tender) =>
      tender?.organisation_chain
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      tender?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tender?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tender?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  const handleDocumentDownload = () => {
    console.log("called handleDocumentDownload");

    const id = new URLSearchParams(searchParams).toString();
    const t = "3";
    dispatch(GetDocumentURL({ id, t }))
      .unwrap()
      .then((fileUrl) => {
        handleDownload(fileUrl, "xls", "export");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="mt-14 px-2 md:px-12 lg:px-24 xl:px-32 mb-10 z-40">
        <Background type="vector" lifed="up" show="no" />
        <main className="w-full flex flex-col justify-center items-center gap-6">
          {/* TITLE */}
          <div className="mt-6 flex flex-col gap-3 w-full justify-center items-center">
            <div className="w-full flex  justify-center items-center">
              <h1 className="font-normal text-2xl md:text-5xl text-start">
                Tenders at a glance
              </h1>
            </div>
            <div className="w-full flex  justify-center items-center">
              <h3 className="font-normal text-xs md:text-xl text-start">
                Choose the best plan for your business.
              </h3>
            </div>
          </div>
          {/* Search Filter */}
          <div className="flex w-full justify-evenly items-center gap-2">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex md:hidden">
              <Button
                disabled={isPlanExpired}
                style={{
                  backgroundColor: "#0554f2",
                  color: isPlanExpired ? "#fff00" : "#fff",
                }}
                aria-describedby="mobileFilters"
                variant="contained"
                onClick={(event) => handleClick(event, "mobileFilters")}
              >
                <TuneIcon />
              </Button>
            </div>
          </div>
          {/* FILTERS */}
          <div
            className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 justify-between items-center "
            style={{
              pointerEvents: isPlanExpired ? "none" : "auto", // Disables all interactions inside this div
              opacity: isPlanExpired ? 0.5 : 1, // Makes it look disabled (optional)
            }}
          >
            {/* Save filter */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="SavedFilters"
              variant="contained"
              onClick={(event) => handleClick(event, "SavedFilters")}
            >
              Save Filters
              <CustomBadge data={userSaverTemplates} />
            </Button>
            {/*bidding_status*/}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="bidding_status"
              variant="contained"
              onClick={(event) => handleClick(event, "bidding_status")}
            >
              Bidding status
              <CustomBadge data={filters.bidding_status ? ["1"] : null} />
            </Button>
            {/* Keywords */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
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

            {/* Organization */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="organisations"
              variant="contained"
              onClick={(event) => handleClick(event, "organisations")}
            >
              Organisations
              <CustomBadge data={filters?.organisations} />
            </Button>

            {/* States */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="states"
              variant="contained"
              onClick={(event) => handleClick(event, "states")}
            >
              State
              <CustomBadge data={filters?.states} />
            </Button>

            {/* Districts */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="districts"
              variant="contained"
              onClick={(event) => handleClick(event, "districts")}
            >
              Districts
              <CustomBadge data={filters?.districts} />
            </Button>

            {/* Tender Amount */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="tenderAmount"
              variant="contained"
              onClick={(event) => handleClick(event, "tenderAmount")}
            >
              Tender Amount
              <CustomBadge data={filters.value_in_rs_max ? ["1"] : null} />
            </Button>

            {/*Published Date*/}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
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

            {/*Closing Date*/}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
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

            {/*Pincode*/}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="pincode"
              variant="contained"
              onClick={(event) => handleClick(event, "pincode")}
            >
              Pincode
              <CustomBadge data={filters.pincode ? ["1"] : null} />
            </Button>

            {/*Sort*/}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
              }}
              aria-describedby="sort"
              variant="contained"
              onClick={(event) => handleClick(event, "sort")}
            >
              <FilterAltIcon />
              Sort
              <CustomBadge data={filters?.ordering} />
            </Button>
            {/*Export*/}
            {/* <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "190px",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
              aria-describedby="export"
              variant="contained"
              onClick={handleDocumentDownload}
            >
              <SystemUpdateAltIcon />
              Export
            </Button> */}
          </div>
          {/* PORTALS */}
          <div>
            {/* Mobile size filters */}
            <Dialog
              id="mobileFilters"
              open={openPopoverId === "mobileFilters"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div className="w-full flex justify-between items-center p-2">
                <label className="pl-2">Filters</label>
                <CloseBTN />
              </div>
              <div className="grid justify-center items-center gap-4 p-4">
                {/* Save filter */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="SavedFilters"
                  variant="contained"
                  onClick={(event) => handleClick(event, "SavedFilters")}
                >
                  Save Filters
                  <CustomBadge data={userSaverTemplates} />
                </Button>
                {/*bidding_status*/}
                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="bidding_status"
                  variant="contained"
                  onClick={(event) => handleClick(event, "bidding_status")}
                >
                  Bidding status
                  <CustomBadge data={filters.bidding_status ? ["1"] : null} />
                </Button>
                {/* Keywords */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
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

                {/* Organization */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="organisations"
                  variant="contained"
                  onClick={(event) => handleClick(event, "organisations")}
                >
                  Organisations
                  <CustomBadge data={filters?.organisations} />
                </Button>

                {/* States */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="states"
                  variant="contained"
                  onClick={(event) => handleClick(event, "states")}
                >
                  State
                  <CustomBadge data={filters?.states} />
                </Button>

                {/* Districts */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="districts"
                  variant="contained"
                  onClick={(event) => handleClick(event, "districts")}
                >
                  Districts
                  <CustomBadge data={filters?.districts} />
                </Button>

                {/* Tender Amount */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="tenderAmount"
                  variant="contained"
                  onClick={(event) => handleClick(event, "tenderAmount")}
                >
                  Tender Amount
                  <CustomBadge data={filters.value_in_rs_max ? ["1"] : null} />
                </Button>

                {/*Published Date*/}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
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

                {/*Closing Date*/}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
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
                {/*Pincode*/}
                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="pincode"
                  variant="contained"
                  onClick={(event) => handleClick(event, "pincode")}
                >
                  Pincode
                  <CustomBadge data={filters.pincode ? ["1"] : null} />
                </Button>

                {/*Sort*/}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "190px",
                  }}
                  aria-describedby="sort"
                  variant="contained"
                  onClick={(event) => handleClick(event, "sort")}
                >
                  <FilterAltIcon />
                  Sort
                  <CustomBadge data={filters?.ordering} />
                </Button>
              </div>
              <Divider />
            </Dialog>
            {/* SavedFilters */}
            <Dialog
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
                  {userSaverTemplates.length ? (
                    userSaverTemplates.map((f, i) => (
                      <button
                        key={i}
                        className="w-full flex justify-between items-center border shadow-md cursor-pointer p-3 my-2"
                        onClick={() => handleSavedSeachFromTemplate(f)}
                      >
                        <h1>{f.templateName}</h1>
                        <button
                          onClick={() => {
                            handleDeleteSavedFiltersbyUsers(f.id);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon fontSize="sm" />
                        </button>
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
            </Dialog>
            {/* Keywords */}
            <Dialog
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
            </Dialog>
            {/* organisations */}
            <Dialog
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  multiple
                  id="organization-autocomplete"
                  limitTags={1}
                  options={orgData} // Array of objects with `id` and `name`
                  disableCloseOnSelect
                  getOptionDisabled={(option) =>
                    userFilters?.ORGANIZATION.length > 0 &&
                    !userFilters?.ORGANIZATION.some((d) => d.id === option.id)
                  }
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  disabled={!filters?.organisations?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.DEPARTMENT.length > 0 &&
                    !userFilters?.DEPARTMENT.some((d) => d.id === option.id)
                  }
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  limitTags={1}
                  disabled={!filters?.departments?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.DIVISION.length > 0 &&
                    !userFilters?.DIVISION.some((d) => d.id === option.id)
                  }
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  limitTags={1}
                  disabled={!filters?.divisions?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.SUB_DIVISION.length > 0 &&
                    !userFilters?.SUB_DIVISION.some((d) => d.id === option.id)
                  }
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  limitTags={1}
                  disabled={!filters?.sub_divisions?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.SECTION.length > 0 &&
                    !userFilters?.SECTION.some((d) => d.id === option.id)
                  }
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  limitTags={1}
                  disabled={!filters?.sections?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.UNIT.length > 0 &&
                    !userFilters?.UNIT.some((d) => d.id === option.id)
                  }
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
            </Dialog>
            {/* states */}
            <Dialog
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
                    sx={{
                      "& .MuiChip-root": {
                        maxWidth: "200px", // Adjust width as needed
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      },
                    }}
                    multiple
                    id="states-autocomplete"
                    options={statesData} // Pass states list
                    disableCloseOnSelect
                    getOptionDisabled={(option) =>
                      userFilters?.STATE?.length > 0 &&
                      !userFilters?.STATE?.some(
                        (district) => district.id === option.id
                      )
                    }
                    getOptionLabel={(option) => option.name} // Show state names
                    value={statesData?.filter((d) =>
                      filters?.states?.some((dep) => dep.id === d.id)
                    )} // Set selected states
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
            </Dialog>
            {/* districts */}
            <Dialog
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                  multiple
                  id="districts-autocomplete"
                  options={districtsData}
                  disableCloseOnSelect
                  getOptionDisabled={(option) =>
                    userFilters?.DISTRICT.length > 0 &&
                    !userFilters?.DISTRICT.some(
                      (district) => district.id === option.id
                    )
                  }
                  getOptionLabel={(option) => option.name}
                  value={districtsData?.filter((d) =>
                    filters?.districts?.some((dep) => dep.id === d.id)
                  )} // Pass the full array of selected district objects
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
            </Dialog>
            {/* Published Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Dialog
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
              </Dialog>
            </LocalizationProvider>
            {/* Closing Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Dialog
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
              </Dialog>
            </LocalizationProvider>
            {/* pincode */}
            <Dialog
              id="pincode"
              open={openPopoverId === "pincode"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div className="w-full flex justify-between items-center p-2">
                <label className="pl-2">Pincode</label>
                <CloseBTN />
              </div>
              <Divider />
              <div className="p-5 flex flex-col gap-4">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  value={filters?.pincode}
                  onChange={handleFilterSelection}
                  className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none p-2 rounded-md"
                />
                <div className="flex justify-around">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("pincode")}
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
            </Dialog>
            {/* pincode */}
            <Dialog
              id="pincode"
              open={openPopoverId === "pincode"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div className="w-full flex justify-between items-center p-2">
                <label className="pl-2">Pincode</label>
                <CloseBTN />
              </div>
              <Divider />
              <div className="p-5 flex flex-col gap-4">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  value={filters?.pincode}
                  onChange={handleFilterSelection}
                  className="border-2 shadow-md borber-[#565656]  focus:border-[#0554F2] focus:outline-none p-2 rounded-md"
                />
                <div className="flex justify-around">
                  <button
                    className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("pincode")}
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
            </Dialog>
            {/* bidding_status */}
            <Dialog
              id="bidding_status"
              open={openPopoverId === "bidding_status"}
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
                <label className="pl-2">Bidding Status</label>
                <CloseBTN />
              </div>
              <Divider />
              <div className="w-full flex flex-col gap-4 justify-between items-center px-4 py-2">
                {/* Published Date */}
                <div className="w-full flex gap-6 justify-between items-center">
                  <h1 className="w-1/3 text-base font-medium text-start">
                    Bidding status
                  </h1>
                  <ToggleButtonGroup
                    color="primary"
                    value={filters?.bidding_status}
                    exclusive
                    onChange={(event, newValue) => {
                      setFilters({
                        ...filters,
                        bidding_status: newValue,
                      });
                    }}
                    aria-label="Platform"
                    sx={{ width: "100%" }}
                  >
                    <ToggleButton sx={{ width: "100%" }} value="active">
                      Active
                    </ToggleButton>
                    <ToggleButton sx={{ width: "100%" }} value="closed">
                      Closed
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div className="flex justify-around pb-3">
                <button
                  className="flex gap-4 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                  onClick={() => handleReset("bidding_status")}
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
            </Dialog>
            <Dialog
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
                  sx={{
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    width: 300,
                  }}
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
                  sx={{
                    width: 300,
                    "& .MuiChip-root": {
                      maxWidth: "200px", // Adjust width as needed
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
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
            </Dialog>
          </div>

          <div className="w-full p-2 flex justify-end items-center">
            {/*Export*/}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#10793F",
                color: isPlanExpired ? "#fff00" : "#fff",

                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
              aria-describedby="export"
              variant="contained"
              onClick={handleDocumentDownload}
            >
              <SystemUpdateAltIcon />
              Export Results
            </Button>
          </div>

          {/* TENDERS RENDER */}
          <div className="w-full flex flex-col justify-center items-center">
            {tenderIsLoading ? (
              <div className="h-[20vh]"></div>
            ) : (
              filteredTenders?.map((tender, i) => {
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
                    className={`flex flex-col md:flex-row  justify-between ${
                      i % 2 === 0 ? "bg-white" : "bg-[#e2ecff]"
                    } py-6 px-2 rounded-md gap-4 min-h-56 max-w-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full`}
                  >
                    <div className="w-full flex flex-col gap-5">
                      <div className="flex gap-4 flex-col ">
                        <div className="">
                          <h1 className="text-base font-semibold text-ellipsis">
                            {tender?.id}|{tender?.organisation_chain}
                          </h1>
                        </div>
                        <div className="flex w-full justify-start items-center overflow-hidden text-ellipsis line-clamp-2">
                          <LocationOnIcon fontSize="small" />
                          <p className="text-sm font-thin">
                            {tender?.district && `${tender?.district},`}
                            {tender?.state && `${tender?.state},`}
                            {tender?.pincode && `${tender?.pincode}`}
                          </p>
                        </div>
                        <div>
                          <span className="p-1 bg-[#EAEAEA] text-xs rounded-md">
                            {tender?.product_category}
                          </span>
                        </div>
                      </div>
                      <div className="break-words text-base max-w-[514px]">
                        <p className="">{tender?.description}</p>
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
                          onClick={() => {
                            handleWishList(tender?.id);
                          }}
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
                            <h1 className="text-[#C9B00F] text-center text-sm font-semibold">
                              {corrigendum?.diffDays} days ago
                            </h1>
                          ) : (
                            <h1 className="text-[#C9B00F] text-center text-sm">
                              -
                            </h1>
                          )}
                        </div>

                        <div className="flex gap-2 md:gap-0 md:flex-col justify-center items-center ">
                          <span
                            style={{
                              color: col,
                            }}
                            className={` rounded-md  text-lg font-extrabold `}
                          >
                            {diffDays}
                          </span>
                          <span
                            style={{
                              color: col,
                            }}
                            className={`text-xs  rounded-md text-center font-medium`}
                          >
                            Days left
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex flex-row gap-2 md:gap-4 justify-center items-center">
                        <div className="px-2 md:px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24 max-w-28 md:max-w-36 w-full">
                          <h6 className="text-[10px] md:text-sm font-normal text-[#565656]">
                            Published Date
                          </h6>
                          <p className="text-[#212121] text-sm md:text-base font-medium">
                            {formatDateTime(tender?.published_date)[0]} <br />
                            {formatDateTime(tender?.published_date)[1]}
                          </p>
                        </div>
                        <div className="px-2 md:px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24 max-w-28 md:max-w-36 w-full">
                          <h6 className="text-[10px] md:text-sm font-normal text-[#565656]">
                            Closing Date
                          </h6>

                          <p className="text-[#212121] text-sm md:text-base font-medium">
                            {formatDateTime(tender?.bid_submission_end_date)[0]}{" "}
                            <br />
                            {formatDateTime(tender?.bid_submission_end_date)[1]}
                          </p>
                        </div>
                        <div className="px-2 md:px-4 py-3 rounded-md border border-[#EAEAEA] shadow-sm min-h-24 max-w-28 md:max-w-36 w-full">
                          <h6 className="text-[10px] md:text-sm font-normal text-[#565656]">
                            Tender Amount
                          </h6>
                          <p className="text-[#212121] text-sm md:text-base font-medium">
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
        {/* Pagination */}
        <div className="flex justify-center items-center mt-14 border p-4 rounded-full shadow-md">
          <Pagination
            disabled={allGood}
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
