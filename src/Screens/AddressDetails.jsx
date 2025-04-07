import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddressDetails,
  InsertUpdateAddressData,
} from "../Redux/Slices/AuthSlice";
import {
  MapPin,
  Building2,
  Landmark,
  LocateFixed,
  Pencil,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";

const AddressDetails = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const address = useSelector((state) => state.auth.addressDetailsData);
  const loading = useSelector((state) => state.auth.authIsLoading);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    village: "",
    pinCode: "",
  });

  useEffect(() => {
    if (user?.id) dispatch(GetAddressDetails(user.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (address) {
      setFormData({
        state: address.state || "",
        city: address.city || "",
        village: address.village || "",
        pinCode: address.pinCode || "",
      });
    }
  }, [address]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedData = {
      id: address?.id,
      ...formData,
      userId: user.id,
    };

    dispatch(InsertUpdateAddressData(updatedData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Failed to update address. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-3 bg-white rounded-md shadow text-xs">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-base font-semibold text-gray-700">📍 Address</h2>
    <div className="flex gap-1">
      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-green-500 hover:text-green-700 transition"
          title="Save"
        >
          <Save size={12} />
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-black transition"
          title="Edit"
        >
          <Pencil size={12} />
        </button>
      )}
    </div>
  </div>

  {loading ? (
    <p className="text-center text-gray-500 text-[10px]">Loading...</p>
  ) : (
    <div className="space-y-2">
      <Field
        icon={<MapPin size={12} />}
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        editable={isEditing}
      />
      <Field
        icon={<Building2 size={12} />}
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        editable={isEditing}
      />
      <Field
        icon={<Landmark size={12} />}
        label="Village"
        name="village"
        value={formData.village}
        onChange={handleChange}
        editable={isEditing}
      />
      <Field
        icon={<LocateFixed size={12} />}
        label="Pin Code"
        name="pinCode"
        value={formData.pinCode}
        onChange={handleChange}
        editable={isEditing}
      />
    </div>
  )}
</div>

  );
};

const Field = ({ label, value, icon, name, onChange, editable }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
      {icon}
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      readOnly={!editable}
      className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:outline-none text-gray-800 ${
        editable ? "focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
      }`}
    />
  </div>
);

export default AddressDetails;
