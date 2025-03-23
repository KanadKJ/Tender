import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDistrictsList,
  GetDivList,
  GetDrpList,
  GetFiltersBasedOnUserId,
  GetOrgList,
  GetPlanList,
  GetSectionList,
  GetStatesList,
  GetSubDivList,
  GetUnitList,
  GetUserList,
} from "../Redux/Slices/CommonSlice";
import { InsertFilterJson } from "../Redux/Slices/AuthSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const plans = [{}];

export default function SystemConfigSuper() {
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
    planData,
    userList,
    filtersBasedOnUsers,
  } = useSelector((s) => s.common);
  const { userData } = useSelector((s) => s.auth);
  console.log(filtersBasedOnUsers);

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [adminFilters, setAdminFilters] = useState({
    ORGANIZATION: filtersBasedOnUsers?.filterJson?.ORGANIZATION || [],
    STATE: [],
    DISTRICT: [],
    DEPARTMENT: [],
    DIVISION: [],
    SUB_DIVISION: [],
    SECTION: [],
    UNIT: [],
    Keyword: [],
    Category: [],
    PinCode: [],
    TenderValue: 10000,
    ExpiryDate: "",
    template: 0,
  });
  const [plan, setPlan] = useState({});
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    dispatch(GetStatesList());
    dispatch(GetOrgList());
    dispatch(GetDistrictsList(29));
    dispatch(GetPlanList());
    dispatch(GetUserList());
  }, []);
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

  const handleSend = () => {
    dispatch(InsertFilterJson({ adminFilters, userDetails, plan, userData }));
  };
  const getFiltersBasedOnUserId = (id) => {
    // dispatch(GetFiltersBasedOnUserId(id?.id));
  };
  useEffect(() => {
    dispatch(GetFiltersBasedOnUserId(userDetails?.id));
  }, [userDetails]);
  useEffect(() => {}, [filtersBasedOnUsers]);
  return (
    <div className="w-full flex flex-col gap-8 rounded-lg shadow-md bg-white p-5">
      <h1 className="w-full text-4xl font-normal text-center mb-8 text-[#212121]">
        Manager
      </h1>
      {/* Users */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          Users
        </label>
        <div className="w-full">
          {/* <Autocomplete
            multiple
            id="Users-autocomplete"
            limitTags={1}
            options={userList} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option.first_name} // No optional chaining needed
            value={userDetails?.id} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                userList.some((d) => d.id === dep.id)
              );

              setUserDetails((prev) => ({
                ...prev,
                validData,
              }));
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.first_name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Users"
                placeholder="Choose Users"
              />
            )}
          /> */}

          <Autocomplete
            value={userDetails}
            onChange={(event, newValue) => {
              getFiltersBasedOnUserId(newValue);
              setUserDetails(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={userList}
            getOptionLabel={(option) => option?.first_name || ""}
            renderInput={(params) => <TextField {...params} label="Users" />}
          />
        </div>
      </div>
      {/* Plans */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          Plans
        </label>
        <div className="w-full">
          {/* <Autocomplete
            multiple
            id="Plans-autocomplete"
            limitTags={1}
            options={planData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option.name} // No optional chaining needed
            value={plan?.planId} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                planData.some((d) => d.planId === dep.planId)
              );

              setPlan((prev) => ({
                ...prev,
                validData,
              }));
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Plan"
                placeholder="Choose Plan"
              />
            )}
          /> */}
          <Autocomplete
            value={plan}
            onChange={(event, newValue) => {
              setPlan(newValue);
            }}
            id="controllable-states-demo"
            options={planData}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Choose Plan" />
            )}
          />
        </div>
      </div>
      {/* District */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          DISTRICTS
        </label>
        <div className="w-full">
          <Autocomplete
            multiple
            id="districts-autocomplete"
            limitTags={1}
            options={districtsData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option.name} // No optional chaining needed
            value={adminFilters?.DISTRICT} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                districtsData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                DISTRICT: validData,
              }));
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select districts"
                placeholder="Choose districts"
              />
            )}
          />
        </div>
      </div>
      {/* Organisations */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          ORGANIZATION
        </label>
        <div className="w-full">
          <Autocomplete
            multiple
            id="organization-autocomplete"
            limitTags={1}
            options={orgData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option.name} // No optional chaining needed
            value={adminFilters?.ORGANIZATION} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                orgData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                ORGANIZATION: validData,
              }));

              dataFetcher("organization", validData);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select organisation"
                placeholder="Choose organisation"
              />
            )}
          />
        </div>
      </div>
      {/* States */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          STATE
        </label>
        <div className="w-full">
          <Autocomplete
            multiple
            id="states-autocomplete"
            options={statesData} // Pass states list
            disableCloseOnSelect
            getOptionLabel={(option) => option.name} // Show state names
            value={adminFilters.STATE} // Set selected states
            onChange={(event, newValue) => {
              setAdminFilters((prev) => ({
                ...prev,
                STATE: newValue, // Store only state IDs
              }));
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/* Departments */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          DEPARTMENT
        </label>
        <div className="w-full">
          <Autocomplete
            disabled={!adminFilters?.ORGANIZATION?.length}
            multiple
            limitTags={1}
            id="Department-autocomplete"
            options={drpData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name} // No optional chaining needed
            value={drpData.filter((d) =>
              adminFilters?.DEPARTMENT?.some((dep) => dep.id === d.id)
            )} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                drpData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                DEPARTMENT: validData,
              }));

              dataFetcher("department", validData);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/* DIV */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          DIVISION
        </label>
        <div className="w-full">
          <Autocomplete
            limitTags={1}
            disabled={!adminFilters?.DEPARTMENT?.length}
            multiple
            id="division-autocomplete"
            options={divData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name} // No optional chaining needed
            value={divData.filter((d) =>
              adminFilters?.DIVISION?.some((dep) => dep.id === d.id)
            )} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                divData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                DIVISION: validData,
              }));

              dataFetcher("division", validData);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/*SUB DIV */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          SUB_DIVISION
        </label>
        <div className="w-full">
          <Autocomplete
            limitTags={1}
            disabled={!adminFilters?.DIVISION?.length}
            multiple
            id="sub_divisions-autocomplete"
            options={subDivData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name} // No optional chaining needed
            value={subDivData.filter((d) =>
              adminFilters?.SUB_DIVISION?.some((dep) => dep.id === d.id)
            )} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                subDivData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                SUB_DIVISION: validData,
              }));

              dataFetcher("sub_divisions", validData);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/*Sections */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          SECTION
        </label>
        <div className="w-full">
          <Autocomplete
            limitTags={1}
            disabled={!adminFilters?.SUB_DIVISION?.length}
            multiple
            id="sections-autocomplete"
            options={sectionsData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name} // No optional chaining needed
            value={sectionsData.filter((d) =>
              adminFilters?.SECTION?.some((dep) => dep.id === d.id)
            )} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                sectionsData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                SECTION: validData,
              }));

              dataFetcher("sections", validData);
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/*Units */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          UNITs
        </label>
        <div className="w-full">
          <Autocomplete
            limitTags={1}
            disabled={!adminFilters?.SECTION?.length}
            multiple
            id="units-autocomplete"
            options={unitData} // Array of objects with `id` and `name`
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name} // No optional chaining needed
            value={unitData.filter((d) =>
              adminFilters?.UNIT?.some((dep) => dep.id === d.id)
            )} // Ensure objects match by reference
            onChange={(event, newValue) => {
              const validData = newValue.filter((dep) =>
                unitData.some((d) => d.id === dep.id)
              );

              setAdminFilters((prev) => ({
                ...prev,
                UNIT: validData,
              }));
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
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
        </div>
      </div>
      {/*Dates */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          Expiry Date
        </label>
        <div className="w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: "100%",
              }}
              label="Expiry Date"
              value={
                adminFilters.ExpiryDate ? dayjs(adminFilters.ExpiryDate) : null
              }
              onChange={(newValue) => {
                setAdminFilters((prev) => ({
                  ...prev,
                  ExpiryDate: newValue
                    ? dayjs(newValue).format("YYYY-MM-DD")
                    : "",
                }));
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
      {/* Tender value */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          Tender Value
        </label>
        <TextField
          type="number"
          id="outlined-controlled"
          label="Tender Value"
          value={adminFilters.TenderValue || 0}
          onChange={(event) => {
            setAdminFilters({
              ...adminFilters,
              TenderValue: event.target.value,
            });
          }}
          sx={{
            width: "100%",
          }}
        />
      </div>
      {/* templates */}
      <div className="w-full flex flex-col md:flex-row  justify-between">
        <label className="w-2/3 text-base text-[#565656] font-medium">
          Templates
        </label>
        <TextField
          type="number"
          id="outlined-controlled"
          label="Templates"
          value={adminFilters?.template || 0}
          onChange={(event) => {
            setAdminFilters({
              ...adminFilters,
              template: event.target.value,
            });
          }}
          sx={{
            width: "100%",
          }}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={handleSend}
          className="max-w-screen-sm md:w-32 flex justify-center items-center p-2 bg-[#0554F2] rounded-md text-white text-base font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
