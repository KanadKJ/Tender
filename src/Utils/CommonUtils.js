import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import moment from "moment";
export const TMAPI_BASE_URL =
  "https://smp1jsf6ce.execute-api.ap-south-1.amazonaws.com/Prod/TMApi";

export const SCRP_BASE_URL = "https://scraper.etendermitra.in/api";
export const DummyStates = [
  {
    id: "29",
    statename: "West Bengal",
  },
];
const SECRET_KEY = "n9$P@3fLz@1V!sK7zZ*2Qm#5r!J8hL9c";
export const amountOptions = [
  { label: "1K", value: "1000", valueLabel: "1K" },
  { label: "5K", value: "5000", valueLabel: "5K" },
  { label: "10K", value: "10000", valueLabel: "10K" },
  { label: "20K", value: "20000", valueLabel: "20K" },
  { label: "50K", value: "50000", valueLabel: "50K" },
  { label: "1L", value: "100000", valueLabel: "1L" },
  { label: "5L", value: "500000", valueLabel: "5L" },
  { label: "10L", value: "1000000", valueLabel: "10L" },
  { label: "50L", value: "5000000", valueLabel: "50L" },
  { label: "1Cr", value: "10000000", valueLabel: "1Cr" },
  { label: "5Cr", value: "50000000", valueLabel: "5Cr" },
  { label: "10Cr", value: "100000000", valueLabel: "10Cr" },
  { label: "50Cr", value: "500000000", valueLabel: "50Cr" },
  { label: "100Cr", value: "1000000000", valueLabel: "100Cr" },
];
export const dateOptions = [
  { label: "Published Today", value: "today" },
  { label: "Published in 7 days", value: "7days" },
  { label: "Published in 15 days", value: "15days" },
];
export const dateOptionsClosing = [
  { label: "Closing Today", value: "today" },
  { label: "Closing in 7 days", value: "7days" },
  { label: "Closing in 15 days", value: "15days" },
];
export const queryBuilder = (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          params.append(key, item.id);
        } else if (item !== undefined && item !== null && item !== "") {
          params.append(key, item);
        }
      });
    } else {
      params.set(key, value);
    }
  });
  return params.toString();
};
// export const GEO_LOCATION_KEY = "AIzaSyAWT4w__vAES1bLE-k-I3IF1i-Beyf05LA";
export const formatDateTime = (dateString) => {
  if (dateString === undefined) return [null, null];
  const date = new Date(dateString);

  // Format the date (Feb 28, 2025)
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  // Format the time (4:30 am)
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return [formattedDate, formattedTime];
};
export const formatIndianCurrency = (num) => {
  return `₹ ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)}`;
};
export const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num?.toString();
};
export const carouselResponsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
export const dateDifferenceCalculator = (d1, f) => {
  const bidEndDate = moment(d1);
  const today = moment(); // current date and time
  // Difference in milliseconds
  const diffMs = bidEndDate.diff(today);
  // Convert to days, including fractions
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // round up
  let col = "#C91D1D";
  if (diffDays > 10) {
    col = "#14AD30";
  } else if (diffDays > 7) {
    col = "#E58B15";
  }
  if (f === "corrigendum") {
    return { diffDays: diffDays < 0 ? diffDays * -1 : 0, col };
  }
  return { diffDays: diffDays > 0 ? diffDays : 0, col };
};

export const pricingPlanData = {
  free: {
    title: "Free",
    subTitle: "Complete West Bengal (All Districts)",
    id: 1,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "Email Notification",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filters Unlimited",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Advanced Search Tools",
      "All Filters Available",
      "Business Support",
    ],
    price: "0",
    minHeight: "min-h-11",
    caption: "This plan is for those who work across West Bengal.",
  },

  basic: {
    title: "Basic",
    subTitle: "Only one Gram Panchayat",
    id: 2,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filter Limit: Up to 5",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Business Support",
      "",
      "",
      "",
    ],
    price: "599",

    minHeight: "min-h-11",
    caption:
      "This plan is for those who want to see tenders only for a specific panchayat.",
  },
  standard: {
    title: "Standard",
    subTitle: "Any 2 Blocks / Panchayat Samiti",
    id: 3,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filter Limit: Up to 15",
      "Export Tenders to PDF",
      "View BOQ in PDF",
      "Business Support",
      "",
      "",
      "",
    ],
    caption: "This plan is for those who work in specific blocks or panchayat.",
    price: "899",
    minHeight: "min-h-20",
  },
  deluxe: {
    title: "Deluxe",
    subTitle: "Any 3 Districts (All Departments)",
    id: 4,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filter Limit: Up to 25",
      "Advanced Search Tools",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Business Support",
      "",
      "",
    ],
    caption: "This plan is for those who work in multiple districts.",
    price: "1099",
    minHeight: "min-h-11",
  },
  advance: {
    title: "Advance",
    subTitle: "TComplete West Bengal Coverage (All Districts)",
    id: 5,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filters Unlimited",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Advanced Search Tools",
      "All Filters Available",
      "Business Support",
      "",
    ],
    caption: "This plan is for those who work across West Bengal.",
    price: "1799",
    minHeight: "min-h-11",
  },
  professional: {
    title: "Professional",
    subTitle:
      "5 Departments/Organizations across All of West Bengal (e.g., PWD, PHE, Zilla Parishad, WBPDCL, etc.)",
    id: 6,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filter Limit: Up to 25",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Business Support",
      "",
      "",
      "",
    ],
    caption:
      "This plan is for those who want to see tenders only some department.",
    price: "1299",
    minHeight: "min-h-20",
  },
  premium: {
    title: "Premium",
    subTitle:
      "5 Categories across All of West Bengal (e.g., Civil, Electrical, Road, Building, etc.)",
    id: 7,
    featurs: [
      "Tender Search Facility",
      "Tender Document Download",
      "1 Year Old Tenders Can Be Viewed",
      "Save Filter Limit: Up to 30",
      "Tender Export to PDF",
      "View BOQ in PDF",
      "Business Support",
      "",
      "",
      "",
    ],
    caption: "This plan is for those who work in multiple Category.",
    price: "1499",
    minHeight: "min-h-20",
  },
};

/**
 key_id: rzp_live_hG8SfOdRr9wzIf,
 
 key_secret: Ui4ytSpCTpD5HUnhlu2H8Mlr
*/

export const handleDownload = async (fileUrl, t, e) => {
  let name = fileUrl.split("/");
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = now.getFullYear();
  const expName = `${day}-${month}-${year}_MENOKA_eTENDERS`;
  let ext = e === "export" ? `${expName}.csv` : name[name?.length - 1];
  try {
    // const response = await axios.get(fileUrl);
    // console.log(fileUrl);
    
    // const blob = new Blob([response.data], {
    //   type: response.headers["content-type"],
    // });

    // const url = window.URL.createObjectURL(blob);

    // Open in new tab
    // if (t === "xls") {
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = ext; // ← Set your desired filename here
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   // Optional: Clean up the blob URL
    //   window.URL.revokeObjectURL(url);
    // } else {
    //   const newTab = window.open(url, "_blank");
    // }

    // Optional: Revoke the object URL after a short delay
    // setTimeout(() => {
    //   window.URL.revokeObjectURL(url);
    // }, 1000);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = ext; // ← Set your desired filename here
      // link.target = "_blank"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Optional: Clean up the blob URL
      window.URL.revokeObjectURL(fileUrl);
  } catch (error) {
    toast.error("Error downloading the PDF:", error);
  }
};

export const extensionType = (filename) => {
  const x = filename?.split(".");
  return x[x?.length - 1];
};

export const keywordOptions = [
  {
    value: "Administration Housekeeping",
    label: "Administration Housekeeping",
  },
  { value: "Air Conditioner", label: "Air Conditioner" },
  { value: "Almirah", label: "Almirah" },
  { value: "Amc", label: "Amc" },
  {
    value: "Amc For Housekeeping Activities",
    label: "Amc For Housekeeping Activities",
  },
  { value: "Bed", label: "Bed" },
  { value: "Bench", label: "Bench" },
  { value: "Boards", label: "Boards" },
  { value: "Book Shelf", label: "Book Shelf" },
  { value: "Bookcase", label: "Bookcase" },
  { value: "Bridge", label: "Bridge" },
  { value: "Cabinet", label: "Cabinet" },
  { value: "Cable", label: "Cable" },
  { value: "Cable And Wires", label: "Cable And Wires" },
  { value: "Cables", label: "Cables" },
  { value: "Canteen", label: "Canteen" },
  { value: "Cars", label: "Cars" },
  { value: "Catering", label: "Catering" },
  { value: "Cc Road", label: "Cc Road" },
  { value: "Cctv", label: "Cctv" },
  { value: "Chair", label: "Chair" },
  { value: "Civil", label: "Civil" },
  {
    value: "Civil Furniture Maintenance",
    label: "Civil Furniture Maintenance",
  },
  { value: "Classroom Furniture", label: "Classroom Furniture" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Coalescer", label: "Coalescer" },
  { value: "Commercial Furniture", label: "Commercial Furniture" },
  { value: "Compactor", label: "Compactor" },
  { value: "Computer", label: "Computer" },
  { value: "Computer Furniture", label: "Computer Furniture" },
  { value: "Computer Manpower", label: "Computer Manpower" },
  { value: "Construction", label: "Construction" },
  { value: "Cot", label: "Cot" },
  { value: "Cupboard", label: "Cupboard" },
  { value: "Defence", label: "Defence" },
  { value: "Desk", label: "Desk" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Digital Signature", label: "Digital Signature" },
  { value: "Drawer", label: "Drawer" },
  { value: "Drone", label: "Drone" },
  { value: "Dual Desk", label: "Dual Desk" },
  { value: "Duplex Filter", label: "Duplex Filter" },
  { value: "Electrical", label: "Electrical" },
  { value: "Electrical Cable", label: "Electrical Cable" },
  { value: "Electrical Cables", label: "Electrical Cables" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Electrical Goods", label: "Electrical Goods" },
  { value: "Electrical Wire", label: "Electrical Wire" },
  { value: "Electrostatic", label: "Electrostatic" },
  { value: "Fabrication", label: "Fabrication" },
  { value: "Facility Management", label: "Facility Management" },
  { value: "Fire", label: "Fire" },
  { value: "Fire Alarm", label: "Fire Alarm" },
  { value: "Fire Extinguisher", label: "Fire Extinguisher" },
  { value: "Food", label: "Food" },
  { value: "Foot Rest", label: "Foot Rest" },
  { value: "Furniture Items", label: "Furniture Items" },
  { value: "Furnitures And Fixtures", label: "Furnitures And Fixtures" },
  { value: "Gabion", label: "Gabion" },
  { value: "Hospital Furniture", label: "Hospital Furniture" },
  { value: "Ht Cable", label: "Ht Cable" },
  { value: "Hvac", label: "Hvac" },
  { value: "Industrial Furniture", label: "Industrial Furniture" },
  { value: "Institutional Furniture", label: "Institutional Furniture" },
  { value: "Interior", label: "Interior" },
  { value: "Kiosk", label: "Kiosk" },
  { value: "Kitchen", label: "Kitchen" },
  { value: "Laboratory Furnaces", label: "Laboratory Furnaces" },
  { value: "Laboratory Furniture", label: "Laboratory Furniture" },
  { value: "Library Furniture", label: "Library Furniture" },
  { value: "Locker", label: "Locker" },
  { value: "Medicine", label: "Medicine" },
  { value: "Moduler Furniture", label: "Moduler Furniture" },
  { value: "Networking", label: "Networking" },
  { value: "Office Furniture", label: "Office Furniture" },
  { value: "Paint", label: "Paint" },
  { value: "Painting", label: "Painting" },
  { value: "Pipeline", label: "Pipeline" },
  { value: "Plastic Furniture", label: "Plastic Furniture" },
  { value: "Printing", label: "Printing" },
  { value: "Rcc Road", label: "Rcc Road" },
  { value: "Road", label: "Road" },
  { value: "Security Guard", label: "Security Guard" },
  { value: "Security Guards", label: "Security Guards" },
  { value: "Security Service", label: "Security Service" },
  { value: "Signage", label: "Signage" },
  { value: "Software", label: "Software" },
  { value: "Solar", label: "Solar" },
  { value: "Solar Power Plant", label: "Solar Power Plant" },
  { value: "Solar Pump", label: "Solar Pump" },
  { value: "Solar Street Light", label: "Solar Street Light" },
  { value: "Taxi", label: "Taxi" },
  { value: "Transport", label: "Transport" },
  { value: "Uniform", label: "Uniform" },
  { value: "Vehicle", label: "Vehicle" },
  { value: "Vehicle Hiring", label: "Vehicle Hiring" },
  { value: "Water", label: "Water" },
  { value: "Water Proofing", label: "Water Proofing" },
  { value: "Water Supply", label: "Water Supply" },
  { value: "Water Treatment Plant", label: "Water Treatment Plant" },
  { value: "Waterproofing", label: "Waterproofing" },
  { value: "Civil Bridge", label: "Civil Bridge" },
  { value: "Civil Building", label: "Civil Building" },
  { value: "Civil General", label: "Civil General" },
  { value: "Civil Supply", label: "Civil Supply" },
  { value: "Civil Water & Piping", label: "Civil Water & Piping" },
  { value: "Civil Road", label: "Civil Road" },
  { value: "Manpower", label: "Manpower" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Chemicals", label: "Chemicals" },
  { value: "Food Supply", label: "Food Supply" },
  { value: "Horticulture", label: "Horticulture" },
  { value: "Misecllaneous", label: "Misecllaneous" },
  { value: "Medical", label: "Medical" },
  // Add more options if needed
];

export const setEncryptedItem = (value) => {
  const ciphertext = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  return ciphertext;
};
export const getDecryptedItem = (value) => {
  const ciphertext = value;
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (e) {
    console.error("Error decrypting data", e);
    return null;
  }
};

export const WBDistricts = {
  0: [
    { name: "Alipurduar" },
    { name: "Bankura" },
    { name: "Birbhum" },
    { name: "Cooch Behar" },
    { name: "Dakshin Dinajpur" },
    { name: "Darjeeling" },
  ],

  1: [
    { name: "Hooghly" },
    { name: "Howrah" },
    { name: "Jalpaiguri" },
    { name: "Jhargram" },
    { name: "Kalimpong" },
    { name: "Kolkata" },
    { name: "Malda" },
    { name: "Murshidabad" },
    { name: "Nadia" },
    { name: "North 24 Parganas" },
    { name: "Paschim Bardhaman" },
    { name: "Paschim Medinipur" },
    { name: "Purba Bardhaman" },
    { name: "Purba Medinipur" },
    { name: "Purulia" },
    { name: "South 24 Parganas" },
    { name: "Uttar Dinajpur" },
  ],
};

export const testimonailContent = [
  {
    review:
      "“Thanks to E Tender Mitra, I never miss an important tender. The filters save me so much time!”",
    userName: "— Dayamay Chandra",
    posotion: ", Civil Contractor",
  },
  {
    review:
      "“Excellent service and genuine support team. Perfect for small contractors like us.”",
    userName: "— Kaushik Ghosh",
    posotion: ", Electrical Vendor",
  },
  {
    review:
      "“Highly reliable and cost-effective. I’ve secured multiple projects thanks to their timely alerts.”",
    userName: "— Swapan Kuma Bhakta",
    posotion: " Civil Supplier, Birbhum",
  },
  {
    review:
      "“E Tender Mitra saves me hours every week. I only see tenders that matter to me — no clutter, just opportunity.”",
    userName: "— Sourav Ghosh",
    posotion: ", Contractor, Bankura",
  },
  {
    review:
      "“Customer support is amazing. They actually understand tender-related problems and guide you properly.”",
    userName: "— Anurag Chatterjee",
    posotion: ", Electrical Contractor, Birbhum ",
  },
];
export const category = [
  { cname: "Help for bid submission" },
  { cname: "Need Demo" },
  { cname: "Get Digital signature certificate" },
  { cname: "Report for missing tender" },
  { cname: "Request for inactive account" },
  { cname: "Plan on demand" },
  { cname: "Others" },
];
export const planNames = [
  "Free",
  "Basic",
  "Dulex",
  "Advance",
  "Standard",
  "Professional",
  "Premium",
  "Plan on Demand",
];
