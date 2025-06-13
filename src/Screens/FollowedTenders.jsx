import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOrInsertTenderWishlist,
  GetTenderWishlist,
  GetTenderWishlistDetails,
} from "../Redux/Slices/TenderSlice";
import {
  dateDifferenceCalculator,
  formatDateTime,
  formatIndianCurrency,
} from "../Utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { Typography, Popover } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LightbulbCircleOutlinedIcon from "@mui/icons-material/LightbulbCircleOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-toastify";

export default function FollowedTenders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((s) => s.auth);
  const { usersWishlist, tenderIsLoading, tenderDataOfWishlist } = useSelector(
    (s) => s.tender
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverId(null);
  };
  useEffect(() => {
    dispatch(GetTenderWishlist(userData?.id));
  }, []);
  useEffect(() => {
    if (usersWishlist) {
      let uid = usersWishlist?.value
        ?.map((d) => {
          return d.tenderId;
        })
        .join(",");
      if (uid) dispatch(GetTenderWishlistDetails(uid));
    }
  }, [usersWishlist]);
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
  const handleWishList = async (id) => {
    let data = {
      id: "",
      userId: userData?.id,
      tenderId: id,
    };
    try {
      const res = await dispatch(GetOrInsertTenderWishlist(data)).unwrap();
      if (res) {
        dispatch(GetTenderWishlist(userData?.id));
        toast.success("Tender removed from wishlist.")
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
  };
  return (
    <div className="mt-2 md:px-2 mb-10 ">
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="font-semibold text-base md:text-lg text-gray-800">
          Followed Tenders
        </h1>
      </div>
      <div>
        {/* Tender List */}
        {tenderIsLoading ? (
          <div className="h-[100vh]"></div>
        ) : tenderDataOfWishlist?.length ? (
          tenderDataOfWishlist?.map((tender, i) => {
            const { diffDays, col } = dateDifferenceCalculator(
              tender?.bid_submission_end_date
            );

            const corrigendum = dateDifferenceCalculator(
              tender?.corrigendum?.published_date,
              "corrigendum"
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
                      className="flex justify-center items-center text-center gap-2 px-3 py-1 bg-[#0554F2] rounded-md text-white text-xs font-medium hover:bg-white hover:text-[#0554F2] border border-[#fff] transition-all duration-300 ease-in-out"
                    >
                      View
                      <VisibilityOutlinedIcon fontSize="small" />
                    </button>

                    <button
                      onClick={() => handleWishList(tender?.uid)}
                      className="flex items-center gap-1 px-2 py-1 border rounded-md border-[#fff]  text-xs font-medium text-[#fff] hover:bg-[#0554F2] bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
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
                    {corrigendum?.diffDays ? (
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
                    ) : (
                      ""
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
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            <ReceiptLongIcon fontSize="large" className="mb-2 text-gray-400" />
            <Typography variant="body1" sx={{ fontSize: 13 }}>
              No tenders found.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
