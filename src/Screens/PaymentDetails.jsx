import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentDetails } from "../Redux/Slices/TenderSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { formatIndianCurrency } from "../Utils/CommonUtils";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchIcon from "@mui/icons-material/Search";

export default function PaymentDetails({ userId }) {
  const { userData } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((s) => s.tender);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(GetPaymentDetails(userId));
    } else {
      dispatch(GetPaymentDetails(userData?.id));
    }
  }, [userId]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const filteredRows = paymentDetails?.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2 md:px-2 mb-10 z-40">
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="font-semibold text-base md:text-lg text-gray-800">
          Payment History
        </h1>
        <TextField
          size="small"
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: 12 },
          }}
          sx={{ width: 200 }}
        />
      </div>

      {filteredRows?.length > 0 ? (
        <div className="md:w-full max-w-[25rem] md:max-w-screen-md lg:max-w-screen-lg overflow-x-auto custom-scrollbar">
          <TableContainer
            component={Paper}
            className="shadow-md"
            sx={{ borderRadius: 2, maxHeight: "500px" }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                  {[
                    "Name",
                    "Mobile No.",
                    "Email",
                    "Plan Name",
                    "Amount",
                    "Purchase Date",
                    "Status",
                    "Payment Id",
                    "Order Id",
                  ].map((title, i) => (
                    <TableCell
                      key={i}
                      sx={{ fontSize: 11, fontWeight: 600, color: "#1e293b" }}
                      align="center"
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow
                    key={row.paymentId}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.firstName}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.mobileNo}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.planName}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {formatIndianCurrency(row.amount / 100)}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {formatDateTime(row.capturedAt)}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.paymentStatus}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.paymentId}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row.orderId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="w-full text-center py-10 text-gray-500">
          <ReceiptLongIcon fontSize="large" className="mb-2 text-gray-400" />
          <Typography variant="body1" sx={{ fontSize: 13 }}>
            No payment records found.
          </Typography>
        </div>
      )}
    </div>
  );
}
