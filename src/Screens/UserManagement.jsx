import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetUserDetailsWithPlan } from "../Redux/Slices/CommonSlice";
import debounce from "lodash/debounce";
export default function UserManagement() {
  const { userManagementUserDataWithPlan } = useSelector((s) => s.common);
  const [searchTerms, setSearchTerms] = useState("");
  const dispatch = useDispatch();
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (
        typeof value === "string" &&
        value.includes("@") &&
        value.includes(".")
      ) {
        dispatch(GetUserDetailsWithPlan(`Email=${value}`));
      } else if (!isNaN(value)) {
        dispatch(GetUserDetailsWithPlan(`MobileNo=${value}`));
      } else {
        dispatch(GetUserDetailsWithPlan(`firstName=${value}`));
      }
    }, 400),
    []
  );

  const handleGlobalSearch = (e) => {
    const { value } = e.target;
    setSearchTerms(value);

    if (value?.length > 3) {
      debouncedSearch(value);
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
        <TableContainer component={Paper} sx={{ maxWidth: "900px" }}>
          <Table aria-label="simple table">
            <caption>
              {userManagementUserDataWithPlan?.totalRecords &&
                `Total Records : ${userManagementUserDataWithPlan?.totalRecords}`}
            </caption>
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
              {userManagementUserDataWithPlan &&
                userManagementUserDataWithPlan?.value?.map((row) => (
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
        </TableContainer>
      </div>
    </div>
  );
}
