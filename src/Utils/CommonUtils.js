export const TMAPI_BASE_URL =
  "https://smp1jsf6ce.execute-api.ap-south-1.amazonaws.com/Prod/TMApi";

export const SCRP_BASE_URL = "https://scraper.etendermitra.in/api";
export const DummyStates = [
  {
    id: 29,
    statename: "West Bengal",
  },
];
export const queryBuilder = (params) => {
  const enc = window.encodeURIComponent;
  const qStr = Object.keys(params)
    .map((k) => `${enc(k)}=${enc(params[k])}`) // Fix: Use params[k] instead of params(k)
    .join("&");

  return qStr; // Removed the `?` prefix; add it in API call
};
// export const queryBuilder = (filters) => {
//   const query = Object.keys(filters)
//     .filter((key) => filters[key].length > 0)
//     .map((key) =>
//       filters[key]
//         .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
//         .join("&")
//     )
//     .join("&");

//   return query ? `?${query}` : "";
// };
