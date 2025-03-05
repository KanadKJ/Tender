export const TMAPI_BASE_URL =
  "https://smp1jsf6ce.execute-api.ap-south-1.amazonaws.com/Prod/TMApi";

export const SCRP_BASE_URL = "https://scraper.etendermitra.in/api";
export const DummyStates = [
  {
    id: "29",
    statename: "West Bengal",
  },
];
// export const queryBuilder = (params) => {
//   const enc = window.encodeURIComponent;
//   const qStr = Object.keys(params)
//     .map((k) => `${enc(k)}=${enc(params[k])}`) // Fix: Use params[k] instead of params(k)
//     .join("&");

//   return qStr; // Removed the `?` prefix; add it in API call
// };
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
