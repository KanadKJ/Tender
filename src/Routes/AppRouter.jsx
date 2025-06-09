import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Screens/Login";
import Register from "../Screens/Register";

import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../Screens/Dashboard";
import SystemConfigSuper from "../Screens/SystemConfigSuper";
import PaymentDetails from "../Screens/PaymentDetails";
import UserManagement from "../Screens/UserManagement";
import FollowedTenders from "../Screens/FollowedTenders";
import LoginPage from "../Screens/LoginPage";

const HomePage = lazy(() => import("../Screens/HomePage"));

// const TendersPage = lazy(() => import("../Screens/TenderPer"));
const TendersPage = lazy(() => import("../Screens/TenderPer"));

const TenderDetails = lazy(() => import("../Screens/TenderDetails"));

const PricingPage = lazy(() => import("../Screens/Pricing"));

const AboutUsPage = lazy(() => import("../Screens/AboutUs"));

const ProfilePage = lazy(() => import("../Screens/Profile"));
const TermsAndConditionsPage = lazy(() =>
  import("../Screens/TermsAndConditions")
);
const FollowedTendersPage = lazy(() => import("../Screens/FollowedTenders"));
const HelpPage = lazy(() => import("../Screens/Help"));
const ValidateOtpPage = lazy(() => import("../Screens/ValidateOtp"));
const CustomerQueriesPage = lazy(() => import("../Screens/CustomerQueries"));
const RegisterPage = lazy(() => import("../Screens/RegisterPage"));
const AppRouter = () => {
  return (
    <Router basename="/">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            {/* <Route path="/tenders" element={<TendersPage />} /> */}
            <Route path="/tenders/" element={<TendersPage />} />
            <Route path="/pricing/" element={<PricingPage />} />
            <Route index element={<HomePage />} />

            <Route path="/T&C" element={<TermsAndConditionsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/validateOtp" element={<ValidateOtpPage />} />
            <Route path="/About-Us" element={<AboutUsPage />} />
            <Route path="/tenders/:id" element={<TenderDetails />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <ProfilePage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoutes>
                    <ProfilePage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="payment-history"
                element={
                  <ProtectedRoutes>
                    <PaymentDetails />
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
              <Route
                path="UserManagement"
                element={
                  <ProtectedRoutes>
                    <UserManagement />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="FollowTenders"
                element={
                  <ProtectedRoutes>
                    <FollowedTendersPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="CustomerQueries"
                element={
                  <ProtectedRoutes>
                    <CustomerQueriesPage />
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
