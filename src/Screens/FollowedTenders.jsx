import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTenderWishlist,
  GetTenderWishlistDetails,
} from "../Redux/Slices/TenderSlice";

export default function FollowedTenders() {
  const dispatch = useDispatch();
  const { userData } = useSelector((s) => s.auth);
  const { usersWishlist } = useSelector((s) => s.tender);
  useEffect(() => {
    dispatch(GetTenderWishlist(userData?.id));
  }, []);
  useEffect(() => {
    if (usersWishlist) {
      let uid = usersWishlist?.value
        ?.map((d) => {
          return d.tenderId;
        })
        .join(",");
      dispatch(GetTenderWishlistDetails(uid));
    }
  }, [usersWishlist]);

  return (
    <div className="mt-2 md:px-2 mb-10 z-40">
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="font-semibold text-base md:text-lg text-gray-800">
          Followed Tenders
        </h1>
      </div>
    </div>
  );
}
