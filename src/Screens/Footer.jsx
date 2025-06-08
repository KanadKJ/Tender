import React, { useState } from "react";
import footerImg from "../Assets/FooterGradient.png";
import {
  FaPhoneAlt,
  FaYoutube,
  FaFacebook,
  FaGoogle,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("Hi");

  return (
    <>
      <footer
        style={{
          backgroundImage: `url(${footerImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="text-white py-12 px-6 md:px-16 bg-blue-900"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h1 className="text-xl font-bold underline">Menoka Enterprise</h1>
            <p className="text-sm leading-relaxed text-justify">
              e-Tender Mitra is a branch of Menoka Enterprise. We provide tender
              information for West Bengal, help with bid submissions, and offer
              Digital Signature Certificates. We have been working in this field
              for more than 10 years.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold underline">Links</h1>
            <ul className="space-y-1 text-sm">
              <li
                onClick={() => navigate("/")}
                className="cursor-pointer hover:underline"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/tenders")}
                className="cursor-pointer hover:underline"
              >
                Tender
              </li>
              <li
                onClick={() => navigate("/T&C")}
                className="cursor-pointer hover:underline"
              >
                Privacy Policy
              </li>
              <li
                onClick={() => navigate("/pricing")}
                className="cursor-pointer hover:underline"
              >
                Pricing
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="cursor-pointer hover:underline"
              >
                Contact Us
              </li>
              <li
                onClick={() => navigate("/T&C")}
                className="cursor-pointer hover:underline"
              >
                Terms & Condition
              </li>
            </ul>
          </div>

          {/* Browse Tender */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold underline">Browse Tender</h1>
            <ul className="space-y-1 text-sm">
              {[
                "State",
                "District",
                "City",
                "Pin Code",
                "Search by Keyword",
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate("/tenders")}
                  className="hover:underline cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h1 className="text-lg font-semibold underline">
              For Seal Enquiry & Support
            </h1>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> 91-8759441352
              </p>
              <p className="flex items-center gap-2">
                <MdEmail /> info@etendermitra.in
              </p>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61574191401017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-900 p-2 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  <FaFacebook size={18} />
                </a>

                <a
                  href="https://www.youtube.com/@eTenderMitra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-900 p-2 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  <FaYoutube size={18} />
                </a>

                <a
                  href="https://g.co/kgs/dEEg98Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-900 p-2 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  <FaGoogle size={18} />
                </a>

                <span
                  className="bg-white text-blue-900 p-2 rounded-full hover:bg-green-500 hover:text-white transition cursor-pointer"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <FaWhatsapp size={18} />
                </span>
              </div>
              <p className="text-xs mt-3">📺 How it Works</p>
            </div>
          </div>

          {/* Mobile Apps */}
          <div className="space-y-3">
            <h1 className="text-lg font-semibold underline">Mobile Apps</h1>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-36 rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            </a>
            <div>
              <p className="underline text-sm">Office Address</p>
              <p className="text-sm">Purandarpur, Birbhum, W.B.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-64 bg-white shadow-lg rounded-lg border border-gray-300">
          <div className="bg-green-500 text-white p-2 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Welcome</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white font-bold"
            >
              ×
            </button>
          </div>
          <div className="p-3 text-sm text-gray-700">
            Hello there! Send Hi to start conversation with eTender Mitra
            chatbot.
          </div>
          <div className="flex items-center border-t p-2">
            <input
              type="text"
              className="flex-1 text-sm border-none outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 text-green-500"
              onClick={() => {
                const encodedMessage = encodeURIComponent(message);
                const phoneNumber = "918759441352";
                const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
                window.open(whatsappUrl, "_blank");
              }}
            >
              <FaWhatsapp size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
