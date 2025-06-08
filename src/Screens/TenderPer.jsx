import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import { useDispatch, useSelector } from "react-redux";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestoreIcon from "@mui/icons-material/Restore"; // Import reset icon
import expireIcon from "../Assets/expireIcon.png";
import Select from "react-select/creatable";
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Popover,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TuneIcon from "@mui/icons-material/Tune";
import ShareIcon from "@mui/icons-material/Share";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  amountOptions,
  dateDifferenceCalculator,
  dateOptions,
  dateOptionsClosing,
  formatDateTime,
  formatIndianCurrency,
  handleDownload,
  keywordOptions,
  queryBuilder,
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
import SearchIcon from "@mui/icons-material/Search";
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
  const [changeListner, setChangeListner] = useState(null);
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
    keywords: [],
    states: [],
    districts: [],
    organisations: [],
    departments: [],
    divisions: [],
    sub_divisions: [],
    units: [],
    sections: [],
    value_in_rs_max: "",
    value_in_rs_min: "",
    published_date_after: "",
    published_date_before: "",
    ordering: ["-published_date"],
    limit: [],
    offset: [],
    pincode: "",
    bidding_status: "active",
    show_tenders_with_no_value: "",
    bidding_submission_end_date_after:
      searchParams.get("bidding_submission_end_date_after") || "",
    bidding_submission_end_date_before:
      searchParams.get("bidding_submission_end_date_before") || "",
  });
  // const [userFilters, setUserFilters] = useState({});
  // const [newDist, setNewDist] = useState({});
  const [datePublishedOption, setDatePublishedOption] = useState("");
  const [dateClosedOption, setDateClosedOption] = useState("");
  const queryString = useQueryParams(filters);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // hooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDistrictsList(29));
    dispatch(GetStatesList());
    dispatch(GetOrgList());
  }, [changeListner]);
  useEffect(() => {
    if (userData) {
      dispatch(GetTemplateDetails(userData?.id));
    }
  }, [userData]);

  useEffect(() => {
    const value_in_rs_min = searchParams.get("value_in_rs_min") || "";
    const value_in_rs_max = searchParams.get("value_in_rs_max") || "";
    const bidding_submission_end_date_after =
      searchParams.get("bidding_submission_end_date_after") || "";
    const bidding_submission_end_date_before =
      searchParams.get("bidding_submission_end_date_before") || "";
    const published_date_after = searchParams.get("published_date_after") || "";
    const published_date_before =
      searchParams.get("published_date_before") || "";
    const offset = searchParams.get("offset") || "";
    const limit = searchParams.get("limit") || "";
    const keywords = searchParams.get("keywords") || "";
    const pincode = searchParams.get("pincode") || "";
    const bidding_status = searchParams.get("bidding_status") || "active";
    const orderingParams = searchParams.getAll("ordering");
    const ordering = orderingParams.length
      ? orderingParams
      : ["-published_date"];
    const show_tenders_with_no_value =
      searchParams.get("show_tenders_with_no_value") || "";
    setFilters({
      keywords,
      ordering,
      value_in_rs_min,
      value_in_rs_max,
      published_date_after,
      published_date_before,
      limit,
      offset,
      pincode,
      bidding_status,
      bidding_submission_end_date_after,
      bidding_submission_end_date_before,
      show_tenders_with_no_value,
    });
  }, []);
  // useEffect(() => {
  //   const pc = searchParams.get("pincode") || "";
  //   setFilters({
  //     ...filters,
  //     pincode: pc,
  //   });
  // }, []);
  useEffect(() => {
    const stateIDS = searchParams.getAll("states") || [];
    const states = stateIDS?.length
      ? stateIDS
          .map((id) => {
            const dt = statesData.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.STATE;

    setFilters({
      ...filters,
      states,
    });
  }, [statesData]);
  useEffect(() => {
    const districtIds = searchParams.getAll("districts") || [];
    const districts = districtIds?.length
      ? districtIds
          .map((id) => {
            const dt = districtsData.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.DISTRICT;

    setFilters({
      ...filters,
      districts,
    });
  }, [districtsData]);

  useEffect(() => {
    const organisationIds = searchParams.getAll("organisations") || [];
    const organisations = organisationIds?.length
      ? organisationIds
          .map((id) => {
            const dt = orgData.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.ORGANIZATION;
    if (organisations?.length) {
      dispatch(GetDrpList(organisations));
    }
    setFilters({
      ...filters,
      organisations,
    });
  }, [orgData]);
  useEffect(() => {
    const departmentIds = searchParams.getAll("departments") || [];
    const departments = departmentIds?.length
      ? departmentIds
          .map((id) => {
            const dt = drpData?.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.DEPARTMENT;
    if (departments?.length) {
      dispatch(GetDivList(departments));
    }
    setFilters({
      ...filters,
      departments,
    });
  }, [drpData]);

  useEffect(() => {
    const divisionIds = searchParams.getAll("divisions") || [];
    const divisions = divisionIds?.length
      ? divisionIds
          .map((id) => {
            const dt = divData?.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.DIVISION;
    if (divisions?.length) {
      dispatch(GetSubDivList(divisions));
    }
    setFilters({
      ...filters,
      divisions,
    });
  }, [divData]);
  useEffect(() => {
    const sub_divisionsIds = searchParams.getAll("sub_divisions") || [];
    const sub_divisions = sub_divisionsIds?.length
      ? sub_divisionsIds
          ?.map((id) => {
            const dt = subDivData?.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.SUB_DIVISION;
    if (sub_divisions?.length) {
      dispatch(GetSectionList(sub_divisions));
    }
    setFilters({
      ...filters,
      sub_divisions,
    });
  }, [subDivData]);

  useEffect(() => {
    const sectionsIds = searchParams.getAll("sections") || [];
    const sections = sectionsIds?.length
      ? sectionsIds
          ?.map((id) => {
            const dt = sectionsData?.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.SECTION;
    if (sections?.length) {
      dispatch(GetUnitList(sections));
    }
    setFilters({
      ...filters,
      sections,
    });
  }, [sectionsData]);
  useEffect(() => {
    const unitIds = searchParams.getAll("units") || [];
    const units = unitIds?.length
      ? unitIds
          ?.map((id) => {
            const dt = unitData?.find((d) => d.id === parseInt(id));
            return dt ? dt : null;
          })
          .filter(Boolean)
      : userFilters?.UNIT;

    setFilters({
      ...filters,
      units,
    });
  }, [unitData]);

  // useEffect(() => {
  //   // let s = searchParams.toString();

  //   dispatch(GetTenderListWithFilters(queryString));
  //   navigate(`?${queryString}`, { replace: true });

  //   // console.log(s,searchParams.toString(),"caller");
  // }, []);

  useEffect(() => {
    console.log("initial obj creator");
    if (userData) {
      const pc = searchParams.get("pincode") || "";
      const kw = searchParams.getAll("keywords") || [];
      const obj = {
        states: userFilters?.STATE,
        districts: userFilters?.DISTRICT,
        organisations: userFilters?.ORGANIZATION,
        pincode: userFilters?.PinCode,
        sections: userFilters?.SECTION,
        divisions: userFilters?.DIVISION,
        sub_divisions: userFilters?.SUB_DIVISION,
        sections: userFilters?.SECTION,
        departments: userFilters?.DEPARTMENT,
        units: userFilters?.UNIT,
        ordering: ["-published_date"],
        bidding_status: "active",
        pincode: filters?.pincode || pc,
        keywords: kw,
      };
      setFilters({
        ...filters,
        pincode: pc,
        keywords: kw,
      });
      let q = queryBuilder(obj);
      navigate(`?${q}`, { replace: true });
      dispatch(GetTenderListWithFilters(q));
    } else {
      let obj = {
        ordering: ["-published_date"],
        bidding_status: "active",
      };
      let q = queryBuilder(obj);
      navigate(`?${q}`, { replace: true });
      dispatch(GetTenderListWithFilters(q));
    }

    // dispatch(GetTenderListWithFilters(userFiltersqueryString));
  }, [userData]);
  const handleClick = (event, id) => {
    if (!userData) {
      navigate("/login");
      return;
    }
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
      setDatePublishedOption("");
    } else if (name === "Closingdates") {
      setFilters((prev) => ({
        ...prev,
        bidding_submission_end_date_after: "",
        bidding_submission_end_date_before: "",
      }));
      setDateClosedOption("");
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: Array.isArray(filters[name]) ? "" : [],
      }));
    }
  };
  const handleFilterSelection = (input) => {
    // Case 1: From react-select (array of options)
    if (Array.isArray(input)) {
      const selectedValues = input.map((option) => option.value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        keywords: selectedValues,
      }));
    }

    // Case 2: From <input> element (e.g., pincode)
    else if (input?.target) {
      const { name, value } = input.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
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
      if (userFilters?.DISTRICT?.length && filters?.districts?.length === 0) {
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
    if (!filters?.states?.length && filters?.districts?.length) {
      toast.error("States are mandatory for adding districts");
      handleClose();
      return;
    }
    errorStr.error = false;
    setAllGood(false);
    handleClose();
    navigate(`?${queryString}`, { replace: true });
    dispatch(GetTenderListWithFilters(queryString));
    return "ok";
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
      dispatch(GetTenderListWithFilters(params.toString()));
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      params.set("offset", newOffset);
      dispatch(GetTenderListWithFilters(params.toString()));
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
      id: "",
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
        toast.error("Something went wrong.");
      });
  };
  const handleSavedSeachFromTemplate = (obj) => {
    dispatch(GetTenderListWithFilters(obj?.url));
    navigate(`?${obj?.url}`, { replace: true });
    setChangeListner(Math.random(0, 10000) * 100);
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
  const dataForNotLoggedInusers = userData
    ? tenderData?.results
    : tenderData?.results?.slice(0, 10);

  const filteredTenders = dataForNotLoggedInusers?.filter(
    (tender) =>
      tender?.organisation_chain
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      tender?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tender?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tender?.product_category
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      tender?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedTenders = filteredTenders?.sort((a, b) => {
    return new Date(b.published_date) - new Date(a.published_date);
  });
  const handleDocumentDownload = () => {
    if (!userData) {
      navigate("/login");
      return;
    }

    const id = new URLSearchParams(searchParams).toString();
    const t = "3";
    dispatch(GetDocumentURL({ id, t }))
      .unwrap()
      .then((fileUrl) => {
        handleDownload(fileUrl, "xls", "export");
      })
      .catch((e) => console.log(e));
  };
  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    handleDeleteSavedFiltersbyUsers(selectedId);
    handleCloseDialog();
    handleClose();
  };
  const handleResetAll = () => {
    // Reset all the filter states to their default values

    if (userData) {
      const obj = {
        states: userFilters?.STATE || [],
        districts: userFilters?.DISTRICT || [],
        organisations: userFilters?.ORGANIZATION || [],
        pincode: userFilters?.PinCode,
        sections: userFilters?.SECTION,
        divisions: userFilters?.DIVISION,
        sub_divisions: userFilters?.SUB_DIVISION,
        sections: userFilters?.SECTION,
        departments: userFilters?.DEPARTMENT,
        units: userFilters?.UNIT,
        ordering: ["-published_date"],
        bidding_status: "active",
      };
      setFilters((prev) => ({
        ...prev,
        bidding_status: "active",
        keywords: null,
        pincode: null,
        value_in_rs_max: null,
        published_date_after: null,
        published_date_before: null,
        bidding_submission_end_date_after: null,
        bidding_submission_end_date_before: null,
        ordering: ["-published_date"],
        ...obj,
      }));

      setDatePublishedOption("");
      setDateClosedOption("");
      let q = queryBuilder(obj);
      navigate(`?bidding_status=active&ordering=-published_date&${q}`, {
        replace: true,
      });
      dispatch(GetTenderListWithFilters(q));
    }
    // navigate(`?bidding_status=active&ordering=-published_date`, { replace: true });
  };

  const searchWitheverything = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilters((prev) => ({
      ...prev,
      keywords: [value],
    }));
  };

  const handleSearchWithEverything = () => {
    if (!userData) {
      toast.error("Please login to continue...");
      navigate("/login");
      return;
    }
    setSearchTerm("");
    dispatch(GetTenderListWithFilters(queryString));
    navigate(`?${queryString}&keywords=${searchTerm}`, { replace: true });
  };

  const handlePdfDownload = () => {
    dispatch(GetDocumentURL({ id: queryString, t: "4", c: "home" }))
      .unwrap()
      .then((fileUrl) => {
        handleDownload(fileUrl);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div id="page-top" className="h-1" />
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
          <div className="flex w-full justify-between items-center gap-2">
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
                placeholder="Search with anything"
                value={searchTerm}
                onChange={(e) => searchWitheverything(e)}
              />
              <button
                disabled={isPlanExpired}
                onClick={handleSearchWithEverything}
                className="p-2 ml-2 bg-[#0554F2] text-white rounded-lg"
              >
                <SearchIcon />
              </button>
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
            className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 justify-between items-center "
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="Keywords"
              variant="contained"
              onClick={(event) => handleClick(event, "Keywords")}
            >
              Keywords
              {filters.keywords && <CustomBadge data={filters?.keywords} />}
            </Button>

            {/* Organization */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="organisations"
              variant="contained"
              onClick={(event) => handleClick(event, "organisations")}
            >
              Organisations
              <CustomBadge
                data={
                  filters?.organisations?.length ||
                  filters?.departments?.length ||
                  filters?.divisions?.length ||
                  filters?.sub_divisions?.length ||
                  filters?.sections?.length ||
                  filters?.units?.length
                    ? ["1"]
                    : null
                }
              />
            </Button>

            {/* States */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="districts"
              variant="contained"
              onClick={(event) => handleClick(event, "districts")}
            >
              Districts
              <CustomBadge data={filters?.districts} />
            </Button>

            {/*Pincode*/}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="pincode"
              variant="contained"
              onClick={(event) => handleClick(event, "pincode")}
            >
              Pincode
              <CustomBadge data={filters.pincode?.length ? ["1"] : null} />
            </Button>
            {/* Tender Amount */}

            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
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
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="datePickerclosing"
              variant="contained"
              onClick={(event) => handleClick(event, "datePickerclosing")}
            >
              Closing Date
              <CustomBadge
                data={
                  filters?.bidding_submission_end_date_after ||
                  filters?.bidding_submission_end_date_before
                    ? ["1"]
                    : null
                }
              />
            </Button>

            {/*Sort*/}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
              }}
              aria-describedby="sort"
              variant="contained"
              onClick={(event) => handleClick(event, "sort")}
            >
              <FilterAltIcon />
              Sort
              <CustomBadge data={filters?.ordering} />
            </Button>

            {/* Reset All Button */}
            <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#5bc0de", // Lighter blue color
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
                height: "28px",
                fontSize: "0.65rem", // Smaller text
                fontWeight: "400",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
              aria-describedby="resetAll"
              variant="contained"
              onClick={handleResetAll}
            >
              <RestoreIcon /> {/* Icon for reset */}
              Reset All
            </Button>
            {/*Export*/}
            {/* <Button
              disabled={isPlanExpired}
              style={{
                backgroundColor: "#0554f2",
                color: isPlanExpired ? "#fff00" : "#fff",
                width: "150px",
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
                    width: "150px",
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
                    width: "150px",
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
                    width: "150px",
                  }}
                  aria-describedby="Keywords"
                  variant="contained"
                  onClick={(event) => handleClick(event, "Keywords")}
                >
                  Keywords
                  {filters.keywords && (
                    <CustomBadge
                      data={filters?.keywords?.length ? ["1"] : null}
                    />
                  )}
                </Button>

                {/* Organization */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "150px",
                  }}
                  aria-describedby="organisations"
                  variant="contained"
                  onClick={(event) => handleClick(event, "organisations")}
                >
                  Organisations
                  <CustomBadge
                    data={
                      filters?.organisations?.length ||
                      filters?.departments?.length ||
                      filters?.divisions?.length ||
                      filters?.sub_divisions?.length ||
                      filters?.sections?.length ||
                      filters?.units?.length
                        ? ["1"]
                        : null
                    }
                  />
                </Button>

                {/* States */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "150px",
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
                    width: "150px",
                  }}
                  aria-describedby="districts"
                  variant="contained"
                  onClick={(event) => handleClick(event, "districts")}
                >
                  Districts
                  <CustomBadge data={filters?.districts} />
                </Button>

                {/*Pincode*/}
                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "150px",
                  }}
                  aria-describedby="pincode"
                  variant="contained"
                  onClick={(event) => handleClick(event, "pincode")}
                >
                  Pincode
                  <CustomBadge data={filters.pincode?.length ? ["1"] : null} />
                </Button>

                {/* Tender Amount */}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "150px",
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
                    width: "150px",
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
                    width: "150px",
                  }}
                  aria-describedby="datePickerclosing"
                  variant="contained"
                  onClick={(event) => handleClick(event, "datePickerclosing")}
                >
                  Closing Date
                  <CustomBadge
                    data={
                      filters?.bidding_submission_end_date_after ||
                      filters?.bidding_submission_end_date_before
                        ? ["1"]
                        : null
                    }
                  />
                </Button>

                {/*Sort*/}

                <Button
                  disabled={isPlanExpired}
                  style={{
                    backgroundColor: "#0554f2",
                    color: isPlanExpired ? "#fff00" : "#fff",
                    width: "150px",
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
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this template?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              id="SavedFilters"
              open={openPopoverId === "SavedFilters"}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div className="w-full flex justify-between items-center p-2 ">
                <label className="pl-2">Save Filter</label>
                <CloseBTN />
              </div>
              <Divider />
              <div className="p-5 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Filter Name"
                  name="saveFilters"
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
                          onClick={(e) => {
                            e.stopPropagation(); // prevent parent onClick
                            handleOpenDialog(f.id);
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
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleClose("saveFilters")}
                  >
                    Close
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleSaveFiltersSearched}
                  >
                    Save Filter
                  </button>
                </div>
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
                {/* Multi-select input with ability to add custom keywords */}
                <Select
                  isMulti
                  name="keywords"
                  options={keywordOptions} // Predefined options for keywords
                  value={(Array.isArray(filters?.keywords)
                    ? filters.keywords
                    : []
                  ).map((keyword) => ({
                    value: keyword,
                    label:
                      keywordOptions?.find(
                        (option) => option?.value === keyword
                      )?.label || keyword,
                  }))}
                  onChange={handleFilterSelection} // Handle the selected options directly
                  className="w-full"
                  classNamePrefix="react-select"
                  placeholder="Select or add keywords"
                  isClearable // Allow clearing selections
                  closeMenuOnSelect={false} // Keeps the menu open when multiple options are selected
                  isCreatable // Allows user to type custom values and create new options
                  createOptionPosition="first" // Adds custom options at the top
                  getNewOptionData={(inputValue) => ({
                    label: inputValue,
                    value: inputValue,
                  })} // Allows users to add their custom keywords
                  menuPortalTarget={document.body} // Ensures the dropdown is displayed outside of the parent container
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999, // Ensure the dropdown is on top
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: 300, // Set a max height for the dropdown
                      overflowY: "auto", // Enable scrolling
                    }),
                  }}
                />
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("keywords")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
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
              <div className="p-5 flex flex-col gap-4">
                {/* ORG */}
                <Autocomplete
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
                    },
                  }}
                  multiple
                  id="organization-autocomplete"
                  limitTags={1}
                  options={orgData}
                  disableCloseOnSelect
                  getOptionDisabled={(option) =>
                    userFilters?.ORGANIZATION.length > 0 &&
                    !userFilters?.ORGANIZATION.some((d) => d.id === option.id)
                  }
                  getOptionLabel={(option) => option.name}
                  value={orgData.filter((d) =>
                    filters?.organisations?.some((dep) => dep.id === d.id)
                  )}
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8, fontSize: "0.75rem" }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select organisation"
                      placeholder="Choose organisation"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        fontSize: "8px",
                      }}
                    />
                  )}
                />

                {/* DEP */}
                <Autocomplete
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
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
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
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
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
                    },
                  }}
                  limitTags={1}
                  disabled={!filters?.divisions?.length}
                  multiple
                  getOptionDisabled={(option) =>
                    userFilters?.SUB_DIVISION?.length > 0 &&
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
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
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
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
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                  value={unitData?.filter((d) =>
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
                      <li
                        key={key}
                        {...optionProps}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select units"
                      placeholder="Choose units"
                    />
                  )}
                />
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("districts")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleFilterSaved}
                  >
                    Apply
                  </button>
                </div>
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
              <div className="p-5 flex flex-col gap-4">
                <Autocomplete
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select States"
                      placeholder="Choose states"
                    />
                  )}
                />

                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("states")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleFilterSaved}
                  >
                    Apply
                  </button>
                </div>
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
              <div className="p-5 flex flex-col gap-4">
                <Autocomplete
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                  style={{ width: 260 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Districts"
                      placeholder="Choose districts"
                    />
                  )}
                />
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("districts")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleFilterSaved}
                  >
                    Apply
                  </button>
                </div>
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
                <div className="p-5 flex flex-col gap-4">
                  <TextField
                    sx={{
                      fontSize: "12px",
                    }}
                    className="w-full"
                    select
                    label="Date Option"
                    value={datePublishedOption}
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
                          published_date_before = new Date(
                            today.setDate(today.getDate() + 1)
                          )
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

                      setDatePublishedOption(selectedOption);
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
                    format="DD/MM/YYYY"
                    className="w-full"
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
                    format="DD/MM/YYYY"
                    className="w-full"
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
                  <div className="flex justify-between mt-4 gap-x-4">
                    <button
                      className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                      onClick={() => handleReset("dates")}
                    >
                      Reset
                    </button>
                    <button
                      className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                      onClick={handleFilterSaved}
                    >
                      Apply
                    </button>
                  </div>
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
                <div className="p-5 flex flex-col gap-4">
                  <TextField
                    select
                    label="Date Option"
                    value={dateClosedOption}
                    onChange={(e) => {
                      const selectedOption = e.target.value;
                      let bidding_submission_end_date_after = "";
                      let bidding_submission_end_date_before = "";

                      // Set published_date_after and published_date_before based on the selected option
                      const today = new Date();
                      switch (selectedOption) {
                        case "today":
                          bidding_submission_end_date_after = today
                            .toISOString()
                            .split("T")[0];
                          bidding_submission_end_date_before = new Date(
                            today.setDate(today.getDate() + 1)
                          )
                            .toISOString()
                            .split("T")[0];
                          break;
                        case "7days":
                          bidding_submission_end_date_after = new Date()
                            .toISOString()
                            .split("T")[0];

                          bidding_submission_end_date_before = new Date(
                            today.setDate(today.getDate() + 7)
                          )
                            .toISOString()
                            .split("T")[0];
                          break;
                        case "15days":
                          bidding_submission_end_date_after = new Date()
                            .toISOString()
                            .split("T")[0];

                          bidding_submission_end_date_before = new Date(
                            today.setDate(today.getDate() + 15)
                          )
                            .toISOString()
                            .split("T")[0];
                          break;
                        default:
                          break;
                      }

                      setFilters((prev) => ({
                        ...prev,
                        bidding_submission_end_date_after,
                        bidding_submission_end_date_before,
                      }));

                      setDateClosedOption(selectedOption);
                    }}
                  >
                    {dateOptionsClosing?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* From Date Picker */}

                  <DatePicker
                    format="DD/MM/YYYY"
                    className="w-full"
                    label="From Date"
                    value={
                      filters.bidding_submission_end_date_after
                        ? dayjs(filters.bidding_submission_end_date_after)
                        : null
                    }
                    onChange={(newValue) => {
                      setFilters((prev) => ({
                        ...prev,
                        bidding_submission_end_date_after: newValue
                          ? dayjs(newValue).format("YYYY-MM-DD")
                          : "",
                      }));
                    }}
                  />
                  {/* To Date Picker */}

                  <DatePicker
                    format="DD/MM/YYYY"
                    className="w-full"
                    label="To Date"
                    value={
                      filters.bidding_submission_end_date_before
                        ? dayjs(filters?.bidding_submission_end_date_before)
                        : null
                    }
                    onChange={(newValue) => {
                      setFilters((prev) => ({
                        ...prev,
                        bidding_submission_end_date_before: newValue
                          ? dayjs(newValue).format("YYYY-MM-DD")
                          : "",
                      }));
                    }}
                  />
                  <div className="flex justify-between mt-4 gap-x-4">
                    <button
                      className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                      onClick={() => handleReset("Closingdates")}
                    >
                      Reset
                    </button>
                    <button
                      className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                      onClick={handleFilterSaved}
                    >
                      Apply
                    </button>
                  </div>
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
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("pincode")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
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
              <div className="flex justify-around gap-4 p-4">
                <button
                  className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                  onClick={() => handleReset("bidding_status")}
                >
                  Reset
                </button>
                <button
                  className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                  onClick={handleFilterSaved}
                >
                  Apply
                </button>
              </div>
            </Dialog>
            {/* tender amount */}
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
              <div className="p-5 flex flex-col gap-4">
                <Autocomplete
                  className="w-full"
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
                    },
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
                    // const newMaxAmount =
                    //   filters?.value_in_rs_max &&
                    //   newMinAmount > filters?.value_in_rs_min
                    //     ? newMinAmount // Auto-adjust maxAmount
                    //     : filters?.value_in_rs_max;

                    setFilters((prev) => ({
                      ...prev,
                      value_in_rs_min: newMinAmount,
                      // value_in_rs_max: newMaxAmount,
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
                  className="w-full"
                  size="small"
                  sx={{
                    width: "100%", // or specific width
                    "& .MuiChip-root": {
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "2px 6px",
                      minHeight: "32px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.85rem", // ✅ Smaller label
                      // ✅ Optional: move label up slightly
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
                    // const newMinAmount =
                    //   filters?.value_in_rs_min &&
                    //   newMaxAmount < filters?.value_in_rs_max
                    //     ? newMaxAmount // Auto-adjust minAmount
                    //     : filters?.value_in_rs_min;

                    setFilters((prev) => ({
                      ...prev,
                      value_in_rs_max: newMaxAmount,
                      // value_in_rs_min: newMinAmount,
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
                <div className="flex justify-start items-center text-sm">
                  <Checkbox
                    size="sm"
                    label="Required"
                    checked={
                      filters?.show_tenders_with_no_value === "yes"
                        ? true
                        : false
                    }
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        show_tenders_with_no_value: "yes",
                      }))
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <p>Show tenders with no value</p>
                </div>
                <div className="flex justify-between mt-4 gap-x-4">
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={() => handleReset("amounts")}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                    onClick={handleFilterSaved}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Dialog>
            {/* SORT */}
            <Dialog
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
                      filters?.ordering?.find(
                        (o) => o === "published_date" || o === "-published_date"
                      ) || "-published_date"
                    }
                    exclusive
                    onChange={handleOrderingChange}
                    aria-label="Platform"
                    sx={{ width: "100%" }}
                  >
                    <ToggleButton sx={{ width: "100%" }} value="published_date">
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
                      filters?.ordering?.find((o) =>
                        o?.includes("value_in_rs")
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
              <div className="flex justify-around gap-4 p-4 ">
                <button
                  className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                  onClick={() => handleReset("dates")}
                >
                  Reset
                </button>
                <button
                  className="w-full text-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                    hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out "
                  onClick={handleFilterSaved}
                >
                  Apply
                </button>
              </div>
            </Dialog>
          </div>
          {/* TENDERS RENDER */}
          <div className="w-full flex flex-col justify-center items-center overflow-x-hidden box-border">
            {/* Top Button Section */}
            <div className="w-full flex justify-center items-center pb-1">
              {!isPlanExpired && (
                <div className="w-full max-w-screen-lg flex justify-end gap-2 mt-4 mb-2 px-3 md:px-0">
                  {/* PDF Button */}
                  <div className="w-full flex items-center text-[#333333] text-sm font-normal">
                    <span>Total Tenders : {tenderData?.count}</span>
                  </div>
                  <div className="flex justify-end  gap-4">
                    <Button
                      disabled={isPlanExpired}
                      style={{
                        backgroundColor: "#B00020",
                        color: isPlanExpired ? "#fff00" : "#fff",
                        padding: "6px 12px",
                        minWidth: "unset",
                        whiteSpace: "nowrap",
                      }}
                      variant="contained"
                      onClick={handlePdfDownload}
                    >
                      <PictureAsPdfIcon fontSize="small" />
                    </Button>

                    {/* Excel Button */}
                    <Button
                      disabled={isPlanExpired}
                      style={{
                        backgroundColor: "#10793F",
                        color: isPlanExpired ? "#fff00" : "#fff",
                        padding: "6px 12px",
                        minWidth: "unset",
                        whiteSpace: "nowrap",
                      }}
                      variant="contained"
                      onClick={handleDocumentDownload}
                    >
                      <SystemUpdateAltIcon fontSize="small" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Tender List */}
            {tenderIsLoading ? (
              <div className="h-[100vh]"></div>
            ) : sortedTenders?.length && !isPlanExpired ? (
              sortedTenders?.map((tender, i) => {
                const now = new Date();

                // Get local time in ISO format
                const isoString = now.toISOString(); // Example: "2025-03-28T09:30:00.000Z"

                // Convert to IST by adding 5.5 hours (19800 seconds)
                const offsetMillis = 5.5 * 60 * 60 * 1000;
                const ist = new Date(now.getTime() + offsetMillis);

                // Format IST date string manually
                const pad = (n) => String(n).padStart(2, "0");

                const datePart = `${ist.getFullYear()}-${pad(
                  ist.getMonth() + 1
                )}-${pad(ist.getDate())}`;
                const timePart = `${pad(ist.getHours())}:${pad(
                  ist.getMinutes()
                )}:${pad(ist.getSeconds())}`;
                const timezone = "+05:30";
                const { diffDays, col } = dateDifferenceCalculator(
                  `${datePart}T${timePart}${timezone}`,
                  tender?.bid_submission_end_date
                );

                const corrigendum = dateDifferenceCalculator(
                  tender?.corrigendum?.published_date,
                  new Date().toISOString().slice(0, 19)
                );

                const isAlternate = i % 2 !== 0;

                return (
                  <div
                    key={tender?.uid}
                    className={`flex flex-col md:flex-row justify-between border border-gray-300 ${
                      isAlternate
                        ? "bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-400 shadow-sm"
                        : "bg-white"
                    } py-4 px-3 rounded-md gap-4 w-full max-w-screen-lg mb-4 box-border`}
                  >
                    {/* Left Section */}
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-medium text-ellipsis">
                          {tender?.id} | {tender?.organisation_chain}
                        </h1>

                        <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                          <LocationOnIcon fontSize="small" />
                          <p className="text-xs text-gray-600">
                            {tender?.district && `${tender?.district}, `}
                            {tender?.state && `${tender?.state}, `}
                            {tender?.pincode}
                          </p>
                        </div>

                        <span className="px-2 py-[2px] bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full w-fit shadow-sm">
                          {tender?.product_category}
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 break-words max-w-[514px]">
                        {tender?.description}
                      </p>

                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => navigate(`/tenders/${tender?.uid}`)}
                          className="flex gap-2 px-3 py-1 bg-[#0554F2] rounded-md text-white text-xs font-medium hover:bg-white hover:text-[#0554F2] border border-[#0554F2] transition-all duration-300 ease-in-out"
                        >
                          View
                          <VisibilityOutlinedIcon fontSize="small" />
                        </button>

                        <button
                          onClick={() => handleWishList(tender?.uid)}
                          className="flex items-center gap-1 px-2 py-1 border rounded-md border-[#0554F2] bg-white text-xs font-medium text-[#0554F2] hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                        >
                          <FavoriteBorderOutlinedIcon fontSize="small" />
                        </button>
                        <button
                          onClick={(event) => handleClick(event, "share")}
                          className="flex gap-2 p-1 bg-[#0554F2] rounded-md text-white text-xs font-medium hover:bg-white hover:text-[#0554F2] border border-[#0554F2] transition-all duration-300 ease-in-out"
                        >
                          <ShareIcon />
                        </button>
                        <Popover
                          id="share"
                          open={openPopoverId === "share"}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <div className="flex gap-2 p-2">
                            <div className="text-green-600 cursor-pointer p-1 rounded-lg">
                              <a
                                href={
                                  window.location.href
                                    .split("/")[2]
                                    .includes("localhost")
                                    ? `https://api.whatsapp.com/send?text=http://${
                                        window.location.href.split("/")[2]
                                      }/tenders/${tender?.uid}`
                                    : `https://api.whatsapp.com/send?text=https://${
                                        window.location.href.split("/")[2]
                                      }/tenders/${tender?.uid}`
                                }
                                target="_blank"
                              >
                                <WhatsAppIcon />
                              </a>
                            </div>
                            <div className="text-blue-600 cursor-pointer p-1 rounded-lg shadow-md">
                              <a
                                href={`https://mail.google.com/mail/u/0/?fs=1&to&su=Check+this+tender+ID:${
                                  tender?.uid
                                }+from+MENOKA+eTenderMitra&body=https://${
                                  window.location.href.split("/")[2]
                                }/tenders/${tender?.uid}&ui=2&tf=cm`}
                                target="_blank"
                              >
                                <MailOutlineIcon />
                              </a>
                            </div>
                          </div>
                        </Popover>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full flex flex-col gap-4 items-stretch">
                      {/* Corrigendum & Days Left */}
                      <div className="flex flex-col md:flex-row gap-3 w-full justify-end">
                        {corrigendum?.diffDays && (
                          <div className="flex flex-1 justify-start items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-400 rounded shadow-sm">
                            <LightbulbCircleOutlinedIcon
                              fontSize="small"
                              className="text-yellow-600"
                            />
                            <div className="flex items-center whitespace-nowrap gap-1 overflow-hidden text-ellipsis">
                              <span className="text-xs font-bold text-yellow-800">
                                Published Corrigendum -
                              </span>
                              <span className="text-[11px] text-yellow-700 font-medium">
                                {corrigendum?.diffDays
                                  ? `${corrigendum?.diffDays} days ago`
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col justify-end items-center w-full md:w-28">
                          <span
                            className="text-lg font-extrabold"
                            style={{ color: col }}
                          >
                            {diffDays ? diffDays : "Closed"}
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: col }}
                          >
                            {diffDays ? "Days left" : null}
                          </span>
                        </div>
                      </div>

                      {/* Dates and Amount */}
                      <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-stretch w-full">
                        <div className="flex-1 min-w-[100px] px-3 py-3 border-l-4 border-blue-500 bg-[#F9FAFB] rounded-md shadow-sm">
                          <h6 className="text-[11px] font-medium text-[#333] mb-1">
                            📅 Published Date
                          </h6>
                          <p className="text-[#212121] text-xs font-semibold leading-tight">
                            {formatDateTime(tender?.published_date)[0]} <br />
                            {formatDateTime(tender?.published_date)[1]}
                          </p>
                        </div>

                        <div className="flex-1 min-w-[100px] px-3 py-3 border-l-4 border-red-500 bg-[#F9FAFB] rounded-md shadow-sm">
                          <h6 className="text-[11px] font-medium text-[#333] mb-1">
                            ⏳ Closing Date
                          </h6>
                          <p className="text-[#212121] text-xs font-semibold leading-tight">
                            {formatDateTime(tender?.bid_submission_end_date)[0]}{" "}
                            <br />
                            {formatDateTime(tender?.bid_submission_end_date)[1]}
                          </p>
                        </div>

                        <div className="flex-1 min-w-[100px] px-3 py-3 border-l-4 border-green-500 bg-[#F9FAFB] rounded-md shadow-sm">
                          <h6 className="text-[11px] font-medium text-[#333] mb-1">
                            💰 Tender Amount
                          </h6>
                          <p
                            className={`text-xs font-semibold leading-tight ${
                              tender?.value_in_rs === 0
                                ? "text-red-600"
                                : "text-[#212121]"
                            }`}
                          >
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
            ) : isPlanExpired ? (
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <img className="h-16" src={expireIcon} alt="expireIcon" />
                <h1>
                  Your plan has been expired. Please renew your plan to continue
                </h1>
                <button
                  className="p-2 ml-2 bg-[#0554F2] text-white rounded-lg"
                  onClick={() => navigate("/pricing")}
                >
                  Renew Plan
                </button>
              </div>
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                <ReceiptLongIcon
                  fontSize="large"
                  className="mb-2 text-gray-400"
                />
                <Typography variant="body1" sx={{ fontSize: 13 }}>
                  No tenders found.
                </Typography>
              </div>
            )}
          </div>
          {/* Scroll Down Button */}
          {/* Scroll to Bottom Button */}
          <button
            onClick={() => {
              const bottom = document.getElementById("page-bottom");
              bottom?.scrollIntoView({ behavior: "smooth" });
            }}
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
            title="Scroll to Bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* Scroll to Top Button */}
          <button
            onClick={() => {
              const top = document.getElementById("page-top");
              top?.scrollIntoView({ behavior: "smooth" });
            }}
            className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
            title="Scroll to Top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          {/* Place this at the very TOP of your page/component */}
          <div id="page-bottom" className="h-1" />{" "}
          {/* Place this at the very BOTTOM */}
        </main>
        {/* Pagination */}
        {!isPlanExpired && (
          <div className="flex justify-center items-center mt-14 border p-4 rounded-full shadow-md">
            {userData ? (
              <Pagination
                disabled={userData ? false : true}
                count={Math.ceil(tenderData?.count / 50) || 1}
                defaultPage={1}
                siblingCount={0}
                boundaryCount={1}
                color="primary"
                showFirstButton
                onChange={handleChangePages}
                page={filters?.offset / 50 + 1} // Fixed calculation
              />
            ) : (
              <p className="flex gap-2 justify-center items-center">
                <span
                  onClick={() => navigate("/login")}
                  className="text-base font-medium text-[#0554F2] cursor-pointer"
                >
                  Login
                </span>
                <span>to see more tenders</span>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
