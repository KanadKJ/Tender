import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Profile from "../Screens/Profile";
import Tenders from "../Screens/Tenders";

const HomePage = lazy(() => import("../Screens/HomePage"));
const TendersPage = lazy(() => import("../Screens/Tenders"));
const TenderDetails = lazy(() => import("../Screens/TenderDetails"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/tenders" element={<TendersPage />} />
            <Route index element={<HomePage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/tenders/:id" element={<TenderDetails />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
