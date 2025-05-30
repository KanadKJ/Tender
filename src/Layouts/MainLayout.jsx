import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { sibebarHandler } from "../Redux/Slices/CommonSlice";
import Footer from "../Screens/Footer";
import { Backdrop, CircularProgress } from "@mui/material";
import ScrollToTop from "../Components/ScrollToTop";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { tenderIsLoading } = useSelector((s) => s.tender);
  const { isDistrictCallLoading } = useSelector((s) => s.common);
  const { authIsLoading } = useSelector((s) => s.auth);
  const { isSidebarOpen } = useSelector((state) => state.common);
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/signup", "/validateOtp"];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  const handleSidebar = () => {
    dispatch(sibebarHandler(false));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {showHeader && <Header />}

      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleSidebar}
          ></div>
        )}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white text-primary p-0.5 md:p-4 transform transition-transform duration-300 ease-in-out z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <Sidebar />
        </div>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Backdrop
              sx={(theme) => ({
                color: "#0554f29e",
                zIndex: theme.zIndex.drawer + 100,
              })}
              open={tenderIsLoading || isDistrictCallLoading || authIsLoading}
            >
              <CircularProgress
                color="#0554f2"
                style={{
                  zIndex: 100000,
                }}
              />
            </Backdrop>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
