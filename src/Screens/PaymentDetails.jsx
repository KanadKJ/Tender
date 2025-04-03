import React, { useEffect } from "react";
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

export default function PaymentDetails() {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((s) => s.tender);
  const { userData } = useSelector((s) => s.auth);
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);
  useEffect(() => {
    if (userData) dispatch(GetPaymentDetails(userData?.id));
  }, []);
  const obj = [
    {
      firstName: "One User",
      mobileNo: "9874563211",
      email: "oneuser@gmail.com",
      planName: "Basic",
      amount: 399,
      capturedAt: "2025-04-03T18:00:06.727Z",
      paymentStatus: "Success",
      paymentId: "ABCD",
      orderId: "ID_001",
    },
    {
      paymentId: "ABCD",
      amount: 399,
      orderId: "ID_001",
      paymentStatus: "Success",
      capturedAt: "2025-04-03T18:00:06.727Z",
      planName: "Basic",
      firstName: "One User",
      email: "oneuser@gmail.com",
      mobileNo: "9874563211",
      createdOn: "2025-04-03T18:00:06.727Z",
    },
  ];
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className="mt-2 px-2 mb-10 z-40">
      <div className="w-full justify-start items-center">
        <h1 className="font-normal text-xs md:text-xl text-start pb-4">
          Payment History
        </h1>
      </div>
      <div className="w-full">
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 12 }}>Name</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Mobile no.
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Email
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Plan name
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Amount
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Purchase Date
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Status
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Payment Id
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="center  ">
                  Order Id
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obj?.map((row) => (
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
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.amount}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {formatDateTime(row.capturedAt)}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.paymentStatus}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.paymentId}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center  ">
                    {row.orderId}
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
