export const TMAPI_BASE_URL =
  "https://smp1jsf6ce.execute-api.ap-south-1.amazonaws.com/Prod/TMApi";

export const SCRP_BASE_URL = "https://scraper.etendermitra.in/api";
export const DummyStates = [
  {
    id: "29",
    statename: "West Bengal",
  },
];
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
export const queryBuilder = (params) => {
  const queryParams = [];

  Object.entries(params).forEach(([key, value]) => {
    console.log(key, value);

    if (Array.isArray(value) && value.length > 0) {
      // If array, handle objects or primitive values
      value.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          // If item is an object, extract the `id` property
          queryParams.push(`${key}=${encodeURIComponent(item.id)}`);
        } else {
          // If item is a primitive value, add it directly
          queryParams.push(`${key}=${encodeURIComponent(item)}`);
        }
      });
    } else if (value !== undefined && value !== null && value !== "") {
      // Add non-empty values to query
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  return queryParams.length ? `?${queryParams.join("&")}` : "";
};
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

  if (isNaN(date1) || isNaN(date2)) {
    return { diffDays: null, col: "#000000" };
  }

  const diffTime = date2 - date1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let col = "#C91D1D";
  if (diffDays > 20) {
    col = "#14AD30";
  } else if (diffDays > 15) {
    col = "#E58B15";
  }

  return { diffDays, col };
};

export const testJson = {
  UNIT: [],
  STATE: [
    {
      id: 29,
      name: "West Bengal",
    },
  ],
  Keyword: [],
  PinCode: [],
  SECTION: [],
  Category: [],
  DISTRICT: [
    {
      id: 558,
      name: "24 Paraganas North",
      state: "West Bengal",
    },
    {
      id: 559,
      name: "24 Paraganas South",
      state: "West Bengal",
    },
  ],
  DIVISION: [
    {
      id: 1,
      name: "AEO - DURGAPUR",
    },
  ],
  template: 0,
  DEPARTMENT: [
    {
      id: 1,
      name: "WB LIVESTOCK DEV CORP LTD",
    },
    {
      id: 2,
      name: "PASCHIM BANGA GO SAMPAD BIKASH SANSTHA",
    },
    {
      id: 4,
      name: "MOTHER DAIRY KOLKATA",
    },
    {
      id: 14,
      name: "BANGLAR DAIRY LIMITED",
    },
    {
      id: 5,
      name: "DURGAPUR",
    },
  ],
  ExpiryDate: "",
  TenderValue: 10000,
  ORGANIZATION: [
    {
      id: 1,
      name: "ANIMAL RESOURCES DEVELOPMENT DEPARTMENT",
    },
    {
      id: 2,
      name: "ASANSOL DURGAPUR DEVELOPMENT AUTHORITY",
    },
    {
      id: 3,
      name: "BIDHAN CHANDRA KRISHI VISWAVIDYALAYA",
    },
    {
      id: 4,
      name: "BISWA BANGLA MARKETING CORPORATION LIMITED",
    },
  ],
  SUB_DIVISION: [
    {
      id: 2,
      name: "EE - DURGAPUR",
    },
  ],
};
//uid
// expiry date
