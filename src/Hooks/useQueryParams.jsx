import { useMemo } from "react";

const useQueryParams = (filters) => {
  const queryString = useMemo(() => {
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
  }, [filters]);

  return queryString;
};

export default useQueryParams;
