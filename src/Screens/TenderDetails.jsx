import React, { useEffect } from "react";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetTenderDetails } from "../Redux/Slices/TenderSlice";
import DownloadIcon from "@mui/icons-material/Download";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { formatDateTime, formatIndianCurrency } from "../Utils/CommonUtils";
import { Divider } from "@mui/material";
export default function TenderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tenderDetails } = useSelector((s) => s.tender);
  useEffect(() => {
    dispatch(GetTenderDetails(id));
  }, []);
  return (
    <div className="mt-32 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40 w-full">
      <Background type="vector" lifed="up" show="no" />
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="w-full flex flex-col gap-4">
            <h6 className="text-3xl">{tenderDetails?.organisation}</h6>
            <div className="flex w-full justify-start items-center overflow-hidden text-ellipsis line-clamp-2">
              <LocationOnIcon fontSize="small" />
              <p className="text-sm font-thin">{tenderDetails?.location}</p>
            </div>
            <div>
              <span className="p-1 bg-[#EAEAEA] text-xs rounded-md">
                {tenderDetails?.product_category}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <button
              className="flex gap-2 p-2 bg-[#0554F2] rounded-md text-white text-base font-medium
                hover:bg-[#0554f228] hover:text-[#0554F2] transition-all duration-300 ease-in-out 
                group"
            >
              Bid now
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">Date</h1>
              </div>
              <Divider />
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Published Date</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {formatDateTime(tenderDetails?.published_date)[0]}
                  </span>
                  <span>
                    {formatDateTime(tenderDetails?.published_date)[1]}
                  </span>
                </p>
              </div>
              <div className="flex justify-between bg-white">
                <p className="text-[#565656] text-sm">Closing Date</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[0]}
                  </span>
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[1]}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">COST</h1>
              </div>
              <Divider />
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Tender Amount</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.value_in_rs
                    ? formatIndianCurrency(tenderDetails?.value_in_rs)
                    : "Refer Document"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Emd Amount</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.emd_amount_in_rs
                    ? formatIndianCurrency(tenderDetails?.emd_amount_in_rs)
                    : "Refer Document"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Tender Fee In ₹</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.fee_in_rs
                    ? tenderDetails?.fee_in_rs
                    : "Refer Document"}
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">Contact</h1>
              </div>
              <Divider />
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Inviting Authority</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.inviting_authority_name}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="p-4 border rounded-md flex flex-col gap-4 bg-white">
              <h1 className="text-base font-semibold">Description</h1>
              <Divider />
              <p className="text-sm text-[#565656] font-normal">
                {tenderDetails?.description}
              </p>
            </div>
            <div className="p-4 border rounded-md flex flex-col gap-4">
              <h1 className="text-base font-medium">Tender Documents</h1>
              <Divider />
              <div className="flex flex-col gap-4">
                {tenderDetails?.documents?.map((d) => (
                  <div className="flex justify-between gap-4">
                    <p className="text-sm text-[#565656] font-normal flex gap-2">
                      <span>{d?.name}</span>
                      <span>{d?.size}</span>
                    </p>
                    <p>
                      <button
                        className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                                         hover:border-[#0554F2]     hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                      >
                        <span>Download</span>
                        <DownloadIcon />
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
