import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payments";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash/debounce";
import { GetUserDetailsWithPlan } from "../Redux/Slices/CommonSlice";
import PaymentDetails from "./PaymentDetails";
import AddressDetails from "./AddressDetails";
import CompanyDetails from "./CompanyDetails";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { userManagementUserDataWithPlan } = useSelector((s) => s.common);

  const [searchTerms, setSearchTerms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const rowsPerPage = 100;
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (
        typeof value === "string" &&
        value.includes("@") &&
        value.includes(".")
      ) {
        dispatch(
          GetUserDetailsWithPlan(`Email=${value}&Page=1&Size=${rowsPerPage}`)
        );
      } else if (!isNaN(value)) {
        dispatch(
          GetUserDetailsWithPlan(`MobileNo=${value}&Page=1&Size=${rowsPerPage}`)
        );
      } else {
        dispatch(
          GetUserDetailsWithPlan(
            `firstName=${value}&Page=1&Size=${rowsPerPage}`
          )
        );
      }
    }, 400),
    [dispatch]
  );

  const handleGlobalSearch = (e) => {
    const { value } = e.target;
    setSearchTerms(value);

    if (value?.length > 3) {
      debouncedSearch(value);
    } else if (value === "") {
      setCurrentPage(1);
      dispatch(GetUserDetailsWithPlan(`Page=1&Size=${rowsPerPage}`));
    }
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    if (searchTerms.length > 3) {
      debouncedSearch(searchTerms);
    } else {
      dispatch(GetUserDetailsWithPlan(`Page=${value}&Size=${rowsPerPage}`));
    }
  };

  const handlePaymentHistory = (user) => {
    setSelectedUser(user);
    setShowPaymentPopup(true);
  };

  const handleAddress = (user) => {
    setSelectedUser(user);
    setShowAddressPopup(true);
  };

  const handleCompanyDetails = (user) => {
    setSelectedUser(user);
    setShowCompanyPopup(true);
  };

  const handleLoginAsUser = (user) => {
    console.log("Login as user:", user);
  };

  useEffect(() => {
    dispatch(GetUserDetailsWithPlan(`Page=1&Size=${rowsPerPage}`));
  }, [dispatch]);

  const totalRecords = userManagementUserDataWithPlan?.totalRecords || 0;
  const pageCount = useMemo(
    () => Math.max(Math.ceil(totalRecords / rowsPerPage), 1),
    [totalRecords]
  );

  return (
    <div className="mt-6 px-4 md:px-8 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
      </div>

      {/* Search Input */}
      <div className="mb-6 w-full max-w-sm relative">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fontSize="small"
        />
        <input
          type="text"
          placeholder="Search by email, mobile or name..."
          value={searchTerms}
          onChange={handleGlobalSearch}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <TableContainer component={Paper} className="shadow-md rounded-lg">
          <Table size="small">
            <caption className="caption-top text-sm text-gray-600 px-4 py-2">
              {totalRecords
                ? `Total Records: ${totalRecords}`
                : "No records found"}
            </caption>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                  User Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 12 }}
                  align="center"
                >
                  Mobile No.
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 12 }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 12 }}
                  align="center"
                >
                  Plan Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 12 }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userManagementUserDataWithPlan?.value?.length > 0 ? (
                userManagementUserDataWithPlan.value.map((row) => (
                  <TableRow
                    key={`${row.paymentId}-${row.email}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <TableCell sx={{ fontSize: 12 }}>{row.firstName}</TableCell>
                    <TableCell sx={{ fontSize: 12 }} align="center">
                      {row.mobileNo}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12 }} align="center">
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12 }} align="center">
                      {row.planName}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center space-x-1">
                        <Tooltip title="Check Payment History">
                          <IconButton
                            onClick={() => handlePaymentHistory(row)}
                            size="small"
                          >
                            <PaymentIcon
                              fontSize="small"
                              className="text-blue-600"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Check Address">
                          <IconButton
                            onClick={() => handleAddress(row)}
                            size="small"
                          >
                            <HomeIcon
                              fontSize="small"
                              className="text-green-600"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Check Company Details">
                          <IconButton
                            onClick={() => handleCompanyDetails(row)}
                            size="small"
                          >
                            <BusinessIcon
                              fontSize="small"
                              className="text-purple-600"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Login As User">
                          <IconButton
                            onClick={() => handleLoginAsUser(row)}
                            size="small"
                          >
                            <LoginIcon
                              fontSize="small"
                              className="text-orange-500"
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          size="small"
        />
      </div>

      {/* Payment History Dialog */}
      <Dialog
        open={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="flex justify-between items-center">
          Payment History - {selectedUser?.firstName}
          <IconButton onClick={() => setShowPaymentPopup(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && <PaymentDetails userId={selectedUser.id} />}
        </DialogContent>
      </Dialog>

      {/* Address Dialog */}
      <Dialog
        open={showAddressPopup}
        onClose={() => setShowAddressPopup(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="flex justify-between items-center">
          Address Details - {selectedUser?.firstName}
          <IconButton onClick={() => setShowAddressPopup(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && <AddressDetails userId={selectedUser.id} />}
        </DialogContent>
      </Dialog>

      {/* Company Dialog */}
      <Dialog
        open={showCompanyPopup}
        onClose={() => setShowCompanyPopup(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="flex justify-between items-center">
          Company Details - {selectedUser?.firstName}
          <IconButton onClick={() => setShowCompanyPopup(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && <CompanyDetails userId={selectedUser.id} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
