import { useMemo } from "react";

const useQueryParams = (filters) => {
  console.log(filters);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    // Iterate over all filters
    Object.entries(filters).forEach(([key, value]) => {
      // Skip if the value is empty
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return; // Skip this key-value pair
      }

      if (Array.isArray(value)) {
        // If the value is a non-empty array, append each item as a repeated key
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            // If the item is an object, extract the `id` property
            params.append(key, item.id);
          } else if (item !== undefined && item !== null && item !== "") {
            // If the item is a non-empty primitive, add it directly
            params.append(key, item);
          }
        });
      } else {
        // If the value is a non-empty primitive, add it directly
        params.set(key, value);
      }
    });

    console.log(params.toString());
    return params.toString();
  }, [filters]);

  return queryString;
};

export default useQueryParams;
