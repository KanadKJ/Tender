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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Switch,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payments";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import debounce from "lodash/debounce";
import {
  GetUserDetailsWithPlan,
  ToggleUserStatus,
} from "../Redux/Slices/CommonSlice";
import PaymentDetails from "./PaymentDetails";
import AddressDetails from "./AddressDetails";
import CompanyDetails from "./CompanyDetails";
import { GetUserDetailsForLoginAsUser } from "../Redux/Slices/AuthSlice";
import { toast } from "react-toastify";
import Papa from "papaparse";
export default function UserManagement() {
  const dispatch = useDispatch();
  const { userManagementUserDataWithPlan } = useSelector((s) => s.common);

  const [searchTerms, setSearchTerms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isActive, setIsActive] = useState("");
  const [packageId, setPackageId] = useState("");
  const [isExpired, setIsExpired] = useState("");
  const [expiryFrom, setExpiryFrom] = useState("");
  const [expiryTo, setExpiryTo] = useState("");

  const rowsPerPage = 100;
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);

  const buildQuery = (page = 1, size = rowsPerPage, search = searchTerms) => {
    let query = `Page=${page}&Size=${size}`;
    if (isActive !== "") query += `&IsActive=${isActive}`;
    if (packageId !== "") query += `&PackageId=${packageId}`;
    if (isExpired !== "") query += `&IsExpired=${isExpired}`;
    if (expiryFrom)
      query += `&SearchExpiryFrom=${format(
        new Date(expiryFrom),
        "yyyy-MM-dd"
      )}`;
    if (expiryTo)
      query += `&SearchExpiryTo=${format(new Date(expiryTo), "yyyy-MM-dd")}`;

    if (search.length > 3) {
      if (search.includes("@")) {
        query += `&Email=${search}`;
      } else if (!isNaN(search)) {
        query += `&MobileNo=${search}`;
      } else {
        query += `&FirstName=${search}`;
      }
    }
    return query;
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      dispatch(GetUserDetailsWithPlan(buildQuery(1)));
    }, 400),
    [isActive, packageId, isExpired, expiryFrom, expiryTo, searchTerms]
  );

  const handleGlobalSearch = (e) => {
    const { value } = e.target;
    setSearchTerms(value);
    if (value.length > 3) {
      debouncedSearch();
    } else if (value === "") {
      setCurrentPage(1);
      dispatch(GetUserDetailsWithPlan(buildQuery()));
    }
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    dispatch(GetUserDetailsWithPlan(buildQuery(value)));
  };

  const handleLoginAsUser = (user) => {
    dispatch(
      GetUserDetailsForLoginAsUser({ email: user?.email, password: "" })
    );
  };

  useEffect(() => {
    dispatch(GetUserDetailsWithPlan(buildQuery()));
  }, [isActive, packageId, isExpired, expiryFrom, expiryTo]);

  const totalRecords = userManagementUserDataWithPlan?.totalRecords || 0;
  const pageCount = useMemo(
    () => Math.max(Math.ceil(totalRecords / rowsPerPage), 1),
    [totalRecords]
  );
  const handleActiveInactive = (e, uid) => {
    let statusOfUser = e.target.checked;
    dispatch(ToggleUserStatus({ uid, statusOfUser }))
      .unwrap()
      .then(() => {
        dispatch(GetUserDetailsWithPlan(buildQuery()));
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  const handleDataExport = () => {
    const csv = Papa.unparse(userManagementUserDataWithPlan?.value || []);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="mt-6 px-4 md:px-8 mb-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        User Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 ld:grid-cols-5 gap-4 mb-6">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Active Status</InputLabel>
          <Select
            value={isActive}
            label="Active Status"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Plan</InputLabel>
          <Select
            value={packageId}
            label="Plan"
            onChange={(e) => setPackageId(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[
              "Free",
              "Basic",
              "Dulex",
              "Advance",
              "Standard",
              "Professional",
              "Premium",
              "Plan on Demand",
            ].map((label, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Is Expired</InputLabel>
          <Select
            value={isExpired}
            label="Is Expired"
            onChange={(e) => setIsExpired(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Expiry From"
          type="date"
          size="small"
          sx={{ minWidth: 160 }}
          InputLabelProps={{ shrink: true }}
          value={expiryFrom}
          onChange={(e) => setExpiryFrom(e.target.value)}
        />
        <TextField
          label="Expiry To"
          type="date"
          size="small"
          sx={{ minWidth: 160 }}
          InputLabelProps={{ shrink: true }}
          value={expiryTo}
          onChange={(e) => setExpiryTo(e.target.value)}
        />
      </div>

      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />
          <input
            type="text"
            placeholder="Search by email, mobile or name..."
            value={searchTerms}
            onChange={handleGlobalSearch}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Excel Button */}
        <Button
          style={{
            backgroundColor: "#10793F",
            padding: "6px 12px",
            minWidth: "unset",
            whiteSpace: "nowrap",
          }}
          variant="contained"
          onClick={handleDataExport}
        >
          <SystemUpdateAltIcon fontSize="small" />
        </Button>
      </div>
      <TableContainer
        component={Paper}
        className="shadow-md rounded-lg overflow-x-auto max-w-[280px] md:max-w-full"
      >
        <Table size="small">
          <caption className="caption-top text-sm text-gray-600 px-4 py-2">
            {totalRecords
              ? `Total Records: ${totalRecords}`
              : "No records found"}
          </caption>
          <TableHead>
            <TableRow className="bg-gray-100">
              {[
                "User Name",
                "Mobile No.",
                "Email",
                "Plan Name",
                "Company Name",
                "Created On",
                "Expiry Date",
                "Actions",
              ].map((head, i) => (
                <TableCell
                  key={i}
                  align={i > 0 ? "center" : "left"}
                  sx={{ fontWeight: "bold", fontSize: 12 }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userManagementUserDataWithPlan?.value?.length > 0 ? (
              userManagementUserDataWithPlan.value.map((row) => (
                <TableRow
                  key={`${row.paymentId}-${row.email}`}
                  sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
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
                  <TableCell sx={{ fontSize: 12 }} align="center">
                    {row.companyName || "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center">
                    {row.createdOn
                      ? format(new Date(row.createdOn), "dd-MM-yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} align="center">
                    {row.expiryDate
                      ? format(new Date(row.expiryDate), "dd-MM-yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Tooltip title="Check Payment History">
                        <IconButton
                          onClick={() => {
                            setSelectedUser(row);
                            setShowPaymentPopup(true);
                          }}
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
                          onClick={() => {
                            setSelectedUser(row);
                            setShowAddressPopup(true);
                          }}
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
                          onClick={() => {
                            setSelectedUser(row);
                            setShowCompanyPopup(true);
                          }}
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
                      <Tooltip title="active/Inactive">
                        <Switch
                          onChange={(e) => handleActiveInactive(e, row?.id)}
                          size="small"
                          checked={row?.isactive}
                        />
                      </Tooltip>
                    </div>
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

      <div className="flex justify-center mt-4">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          size="small"
        />
      </div>

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
