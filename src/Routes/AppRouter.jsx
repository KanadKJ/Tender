import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Profile from "../Screens/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../Screens/Dashboard";
import SystemConfigSuper from "../Screens/SystemConfigSuper";

const HomePage = lazy(() => import("../Screens/HomePage"));
const TendersPage = lazy(() => import("../Screens/TenderPer"));
const TenderDetails = lazy(() => import("../Screens/TenderDetails"));
const PricingPage = lazy(() => import("../Screens/Pricing"));
const AboutUsPage = lazy(() => import("../Screens/AboutUs"));
const TermsAndConditionsPage = lazy(() =>
  import("../Screens/TermsAndConditions")
);

const AppRouter = () => {
  return (
    <Router basename="/">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            {/* <Route path="/tenders" element={<TendersPage />} /> */}
            <Route path="/tenders/" element={<TendersPage />} />
            <Route path="/pricing/" element={<PricingPage />} />
            <Route index element={<HomePage />} />

            <Route path="/T&C" element={<TermsAndConditionsPage />} />
            <Route path="/About-Us" element={<AboutUsPage />} />
            <Route path="/tenders/:id" element={<TenderDetails />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="TenderManagement"
                element={
                  <ProtectedRoutes>
                    <SystemConfigSuper />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
