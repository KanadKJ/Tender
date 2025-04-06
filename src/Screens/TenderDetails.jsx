import React, { useEffect } from "react";
import Background from "../Components/Background";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDocumentURL, GetTenderDetails } from "../Redux/Slices/TenderSlice";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  extensionType,
  formatDateTime,
  formatIndianCurrency,
  handleDownload,
} from "../Utils/CommonUtils";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TenderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tenderDetails, documentURL } = useSelector((s) => s.tender);
  useEffect(() => {
    dispatch(GetTenderDetails(id));
  }, []);

  // useEffect(() => {
  //   handleDownload(documentURL);
  // }, [documentURL]);

  const handleDocumentDownload = (id, t, c) => {
    dispatch(GetDocumentURL({ id, t, c }))
      .unwrap()
      .then((fileUrl) => {
        handleDownload(fileUrl, t);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="mt-32 px-6 md:px-12 lg:px-24 xl:px-32 mb-10 z-40 w-full">
      <Background type="vector" lifed="up" show="no" />
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full justify-start items-center overflow-hidden text-ellipsis line-clamp-2">
              <LocationOnIcon fontSize="small" />
              <p className="text-sm font-extralight">
                {tenderDetails?.district && `${tenderDetails?.district},`}
                {tenderDetails?.state && `${tenderDetails?.state},`}
                {tenderDetails?.pincode && `${tenderDetails?.pincode}`}
              </p>
            </div>
            <h6 className="text-3xl">{tenderDetails?.organisation_chain}</h6>
            <h6 className="text-md">Tender ID : {tenderDetails?.id}</h6>
            <h6 className="text-md">
              Reference Number : {tenderDetails?.reference_number}
            </h6>
            <h6 className="text-xl">{tenderDetails?.type}</h6>
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
            <div className="p-4 border rounded-md flex flex-col gap-4 bg-white">
              <h1 className="text-base font-semibold">Title</h1>
              <Divider />
              <p className="text-sm text-[#565656] font-normal">
                {tenderDetails?.title}
              </p>
              <h1 className="text-base font-semibold">Description</h1>
              <Divider />
              <p className="text-sm text-[#565656] font-normal max-w-[514px] break-words">
                {tenderDetails?.description}
              </p>
            </div>

            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">Fees & EMD Details</h1>
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
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">
                  Tender Fee Exemption Allowed
                </p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.fee_exemption_allowed
                    ? tenderDetails?.fee_exemption_allowed
                    : "-"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">EMD Exemption Allowed</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.emd_exemption_allowed
                    ? tenderDetails?.emd_exemption_allowed
                    : "-"}
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">
                  Tender Inviting Authority
                </h1>
              </div>
              <Divider />
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">
                  Inviting Authority Name
                </p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  {tenderDetails?.inviting_authority_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">Website</p>
                <a
                  className="text-[#0554F2] font-normal text-sm flex gap-4"
                  href={`${tenderDetails?.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tenderDetails?.website}
                </a>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
              <div>
                <h1 className="text-base font-semibold">Critical Dates</h1>
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
              <div className="flex justify-between">
                <p className="text-[#565656] text-sm">
                  Document Download Start Date
                </p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {
                      formatDateTime(
                        tenderDetails?.document_download_start_date
                      )[0]
                    }
                  </span>
                  <span>
                    {
                      formatDateTime(
                        tenderDetails?.document_download_start_date
                      )[1]
                    }
                  </span>
                </p>
              </div>
              {/* <div className="flex justify-between bg-white">
                <p className="text-[#565656] text-sm">Closing Date</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[0]}
                  </span>
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[1]}
                  </span>
                </p>
              </div> */}
              <div className="flex justify-between bg-white">
                <p className="text-[#565656] text-sm">
                  Bid Submission End Date
                </p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[0]}
                  </span>
                  <span>
                    {formatDateTime(tenderDetails?.bid_submission_end_date)[1]}
                  </span>
                </p>
              </div>
              <div className="flex justify-between bg-white">
                <p className="text-[#565656] text-sm">Bid Opening Date</p>
                <p className="text-[#212121] font-normal text-sm flex gap-4">
                  <span>
                    {formatDateTime(tenderDetails?.bid_opening_date)[0]}
                  </span>
                  <span>
                    {formatDateTime(tenderDetails?.bid_opening_date)[1]}
                  </span>
                </p>
              </div>
            </div>
            {tenderDetails?.corrigendums?.length !== 0
              ? tenderDetails?.corrigendums?.map((row) => (
                  <div className="p-4 border rounded-md flex flex-col gap-4  bg-white">
                    <div>
                      <h1 className="text-base font-semibold">
                        Latest Corrigendum List
                      </h1>
                    </div>
                    <Divider />
                    <div>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell align="right">Type</TableCell>
                              <TableCell align="right">Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              key={row?.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row?.title}
                              </TableCell>
                              <TableCell align="center">{row?.type}</TableCell>
                              <TableCell align="right">
                                {row?.description}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                ))
              : null}
            <div className="p-4 border rounded-md flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-medium">Tender Documents</h1>
                {/* <button
                  className="gap-2 flex p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                hover:border-[#0554F2]     hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                >
                  <span className="text-center">Download All</span>
                  <FileDownloadOutlinedIcon />
                </button> */}
              </div>
              <Divider />
              <div className="flex flex-col gap-4">
                {tenderDetails?.documents?.map((d) => (
                  <div className="flex justify-between gap-4">
                    <p className="text-sm text-[#565656] font-normal flex gap-2">
                      <span>{d?.name}</span>
                      <span>{d?.size}</span>
                    </p>
                    <div className="flex gap-4">
                      {extensionType(d?.name) === "xls" && (
                        <button
                          onClick={() =>
                            handleDocumentDownload(
                              d?.id,
                              extensionType(d?.name),
                              "converted"
                            )
                          }
                          className="gap-2 p-2 border rounded-md border-[#e60c0c] bg-white text-sm font-medium text-[#e60c0c] 
                                          hover:bg-[#e60c0c] hover:text-white transition-all duration-300 ease-in-out"
                        >
                          <PictureAsPdfIcon color="#e60c0c" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDocumentDownload(
                            d?.id,
                            extensionType(d?.name),
                            "default"
                          )
                        }
                        className="gap-2 p-2 border rounded-md border-[#0554F2] bg-white text-sm font-medium text-[#0554F2] 
                                         hover:border-[#0554F2]     hover:bg-[#0554F2] hover:text-white transition-all duration-300 ease-in-out"
                      >
                        <FileDownloadOutlinedIcon />
                      </button>
                    </div>
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
