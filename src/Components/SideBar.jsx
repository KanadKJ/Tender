// src/components/Sidebar/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ onLinkClick }) => {
  return (
    <div className="h-full bg-white">
      <nav>
        <ul>
          <li className="mb-2">
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={onLinkClick} // Close sidebar on mobile after clicking a link
            >
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/about"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={onLinkClick}
            >
              About
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={onLinkClick}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/register"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={onLinkClick}
            >
              register
            </Link>
          </li>
          {/* Add more links */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
