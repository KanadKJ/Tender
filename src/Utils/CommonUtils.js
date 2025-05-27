import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

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
export const GEO_LOCATION_KEY = "AIzaSyAWT4w__vAES1bLE-k-I3IF1i-Beyf05LA";
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
export const carouselResponsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
export const dateDifferenceCalculator = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  if (isNaN(date1) || isNaN(date2)) {
    return { diffDays: null, col: "#000000" };
  }

  const diffTime = date2 - date1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let col = "#C91D1D";
  if (diffDays > 10) {
    col = "#14AD30";
  } else if (diffDays > 7) {
    col = "#E58B15";
  }

  return { diffDays: diffDays > 0 ? diffDays : 0, col };
};

export const pricingPlanData = {
  free: {
    title: "Free",
    subTitle: "All West Bengal ",
    id: 1,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save unlimited filters & PDF exports",
      "BOQ View on PDF",
      "Advance Search",
      "All Filter Access",
    ],
    price: "0",
  },

  basic: {
    title: "Basic",
    subTitle: "One Gram Panchayat",
    id: 2,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "6 Months Old Tender View",
      "Save Filter Limit 2 filters & PDF exports",
      "BOQ View on PDF",
    ],
    price: "399",
  },
  delux: {
    title: "Dulex",
    subTitle: "Three Districts",
    id: 3,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save Filter Limit 10 & PDF Export",
      "BOQ View on PDF",
    ],
    price: "1199",
  },
  advance: {
    title: "Advance",
    subTitle: "All West Bengal",
    id: 4,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save unlimited filters & PDF exports",
      "BOQ View on PDF",
      "Advance Search",
      "All Filter Access",
    ],
    price: "1799",
  },
  standard: {
    title: "Standard",
    subTitle: "Two Block/Panchayat Samity",
    id: 5,
    featurs: [
      " Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save Filter Limit 10 & PDFExport",
      "BOQ View on PDF",
    ],
    price: "599",
  },
  professional: {
    title: "Professional",
    subTitle:
      "Five Department/Origination ( AllWest Bengal) (ex- PWD, ZillaParishad, WBPDCL, etc)",
    id: 6,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save Filter Limit 10 & PDF Export",
      "BOQ View on PDF",
    ],
    price: "899",
  },
  premium: {
    title: "Premium",
    subTitle: "5 Category /All West Bengal ( exCivil, Electrical, etc)",
    id: 7,
    featurs: [
      "Unlimited Tender Search",
      "Download Document",
      "Email Notification",
      "1 Year Old Tender View",
      "Save Filter Limit 15 & PDF Export",
      "BOQ View on PDF",
    ],
    price: "1399",
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
  let ext = e === "export" ? `${expName}.xls` : name[name?.length - 1];
  try {
    const response = await axios.get(fileUrl, {
      responseType: "blob", // Ensures it's treated as a file
    });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const url = window.URL.createObjectURL(blob);

    // Open in new tab
    const newTab = window.open(url, "_blank");

    // Optional: Revoke the object URL after a short delay
    // setTimeout(() => {
    //   window.URL.revokeObjectURL(url);
    // }, 1000);
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
