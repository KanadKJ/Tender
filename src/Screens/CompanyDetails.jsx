import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCompanyDetails,
  InsertUpdateCompany,
} from "../Redux/Slices/AuthSlice";
import { Building2, Landmark, CalendarClock, Pencil, Save, Globe } from "lucide-react";
import { toast } from "react-toastify";

const CompanyDetails = ({ userId }) => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.auth.companyDetailsData);
  const loading = useSelector((state) => state.auth.authIsLoading);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    yearOfEstablishment: "",
    website: "",
    gstin: "",
  });

  useEffect(() => {
    if (userId) dispatch(GetCompanyDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (company) {
      setFormData({
        companyId: company.companyId || company.id || "",
        companyName: company.companyName || "",
        yearOfEstablishment: company.yearOfEstablishment || "",
        website: company.website || "",
        gstin: company.gstin || "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedData = {
      id: formData.companyId,
      userId,
      companyName: formData.companyName,
      yearOfEstablishment: parseInt(formData.yearOfEstablishment) || 0,
      website: formData.website,
      gstin: formData.gstin,
    };

    dispatch(InsertUpdateCompany(updatedData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Failed to update company details. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-3 bg-white rounded-md shadow text-xs">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-700">🏢 Company</h2>
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
            icon={<Building2 size={12} />}
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            editable={isEditing}
          />
          <Field
            icon={<CalendarClock size={12} />}
            label="Year of Establishment"
            name="yearOfEstablishment"
            value={formData.yearOfEstablishment}
            onChange={handleChange}
            editable={isEditing}
          />
          <Field
            icon={<Globe size={12} />}
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            editable={isEditing}
          />
          <Field
            icon={<Landmark size={12} />}
            label="GSTIN"
            name="gstin"
            value={formData.gstin}
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

export default CompanyDetails;
