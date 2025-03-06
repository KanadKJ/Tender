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
  { label: "Publishing Today", value: "today" },
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
