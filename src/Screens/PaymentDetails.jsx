import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../Redux/Slices/AuthSlice";
import { GetPaymentDetails } from "../Redux/Slices/TenderSlice";

export default function PaymentDetails() {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((s) => s.tender);
  const { userData } = useSelector((s) => s.auth);
  useEffect(() => {
    if (localStorage.getItem("user") && !userData) {
      dispatch(setData(JSON.parse(localStorage.getItem("user"))));
    }
  }, [userData]);
  useEffect(() => {
    if (userData) dispatch(GetPaymentDetails(userData?.id));
  }, []);
  return <div>PaymentDetails</div>;
}
