import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../Redux/Slices/AuthSlice";
import { GetPaymentDetails } from "../Redux/Slices/TenderSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatIndianCurrency } from "../Utils/CommonUtils";

export default function UserManagement() {
  const [searchTerms, setSearchTerms] = useState("");
  const dispatch = useDispatch();
  const handleGlobalSearch = (e) => {
    const { value } = e.target;
    setSearchTerms(value);

    if (value?.length > 3) {
      console.log(value);
    }
  };
  return (
    <div className="mt-2 md:px-2 mb-10 z-40">
      <div className="w-full justify-start items-center">
        <h1 className="font-normal text-xs md:text-xl text-start pb-4">
          User Management
        </h1>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => handleGlobalSearch(e)}
          className="border-2 shadow-md border-gray-400 focus:border-blue-500 focus:outline-none w-3/4 px-1 py-1.5 pl-10 rounded-md"
          placeholder="Search"
        />
      </div>
      <div className="md:w-full max-w-[25rem] md:max-w-screen-md lg:max-w-screen-lg  overflow-x-auto custom-scrollbar">
        {/* <TableContainer component={Paper} sx={{ maxWidth: "900px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 12 }}>User name</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Mobile no.
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Email
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Plan name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentDetails?.map((row) => (
                <TableRow
                  key={row.paymentId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: 12 }} component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.mobileNo}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.planName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
    </div>
  );
}
