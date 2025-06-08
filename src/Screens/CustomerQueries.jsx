import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetContactQueries } from "../Redux/Slices/CommonSlice";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Autocomplete,
  TextField,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { category } from "../Utils/CommonUtils";
export default function CustomerQueries() {
  const { contactQueriesList } = useSelector((s) => s.common);
  const [searchTerms, setSearchTerms] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilters] = useState({
    category: "",
    fullName: "",
    contact: "",
    createdOn: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      category: "",
      fullName: "",
      contact: "",
      createdOn: null,
    };
    dispatch(GetContactQueries(obj));
  }, []);

  const filteredQueries = contactQueriesList?.filter(
    (list) =>
      list?.fullName?.toLowerCase()?.includes(searchTerms) ||
      list?.category?.toLowerCase()?.includes(searchTerms) ||
      list?.contact?.toLowerCase()?.includes(searchTerms) ||
      list?.query?.toLowerCase()?.includes(searchTerms)
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredQueries?.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleFilterSearch = (e) => {
    const { name, value } = e?.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearch = () => {
    let obj = {
      category: filter?.category?.cname,
      fullName: filter?.fullName,
      contact: filter?.contact,
      createdOn: null,
    };
    dispatch(GetContactQueries(obj));
  };
  const handleReset = () => {
    let obj = {
      category: "",
      fullName: "",
      contact: "",
      createdOn: null,
    };
    setFilters((prev) => ({
      ...prev,
      category: null,
      contact: "",
      fullName: "",
      createdOn: null,
    }));
    dispatch(GetContactQueries(obj));
  };
  return (
    <div className="mt-6 px-4 md:px-8 mb-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Customer Queries
      </h1>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full">
          <Autocomplete
            size="small"
            value={filter?.category || null}
            onChange={(event, newValue) =>
              setFilters((prev) => ({
                ...prev,
                category: newValue,
              }))
            }
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
        <div className="w-full">
          <input
            type="text"
            name="fullName"
            placeholder="Search by name"
            value={filter?.fullName}
            onChange={(e) => handleFilterSearch(e)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <input
            type="number"
            name="contact"
            placeholder="Search by contact"
            value={filter?.contact}
            onChange={(e) => handleFilterSearch(e)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="p-2 ml-0.5 w-full bg-[#0554F2] rounded-md text-white text-sm font-medium
                hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
                group"
          >
            Search
          </button>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="p-2 ml-0.5 w-full bg-[#0554F2] rounded-md text-white text-sm font-medium
                hover:bg-[#fff] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
                group"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-sm">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fontSize="small"
        />
        <input
          type="text"
          placeholder="Search by category, query, mobile or name..."
          value={searchTerms}
          onChange={(e) => setSearchTerms(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <TableContainer
        component={Paper}
        className="mt-4 shadow-md rounded-lg overflow-x-auto max-w-[280px] md:max-w-full"
      >
        <Table size="small">
          <caption className="caption-top text-sm text-gray-600 px-4 py-2">
            {paginatedData?.length
              ? `Total Records: ${paginatedData?.length}`
              : "No records found"}
          </caption>
          <TableHead>
            <TableRow className="bg-gray-100">
              {["Full Name", "Category", "Mobile No.", "Query"].map(
                (head, i) => (
                  <TableCell
                    key={i}
                    align={i > 0 ? "center" : "left"}
                    sx={{ fontWeight: "bold", fontSize: 12 }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row, i) => (
                <TableRow
                  key={`${i}o`}
                  sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
                >
                  <TableCell sx={{ fontSize: 12, width: "25%" }} align="center">
                    {row.fullName}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, width: "30%" }} align="center">
                    {row?.category}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, width: "15%" }} align="center">
                    {row.contact}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center">
                    {row.query}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  sx={{ fontSize: 13, py: 2 }}
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredQueries?.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
}
