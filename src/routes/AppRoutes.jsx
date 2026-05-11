import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

// Layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserPanelLayout from "../layouts/UserPanelLayout";

// Pages
import Home from "../pages/Home.jsx";
import FindBikes from "../pages/FindBikes.jsx";
import AdminStats from "../pages/admin/AdminStats.jsx";
import ManageBikes from "../pages/admin/ManageBikes.jsx";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Safety from "../pages/Safety.jsx";
import Process from "../pages/Process.jsx";
import FleetPage from "../pages/Fleet.jsx";
import PricingPage from "../pages/Pricing.jsx";
import VerifyOtp from "../auth/VerifyOtp.jsx";
import UsersList from "../pages/admin/UsersList.jsx";
import LiveTracking from "../pages/admin/LiveTracking.jsx";
import RidesHistory from "../pages/admin/RidesHistory.jsx";
import PaymentManagement from "../pages/admin/Payments.jsx";
import Settings from "../pages/admin/Settings.jsx";
import AdminProfile from "../pages/admin/AdminProfile.jsx";
import UserDashboard from "../pages/user/Dashboard.jsx";
import BookRide from "../pages/user/BookRide.jsx";
import MyRides from "../pages/user/MyRides.jsx";
import MyWallet from "../pages/user/MyWallet.jsx";
import AccountSettings from "../pages/user/AccountSettings.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import StationManagement from "../pages/admin/StationManagement.jsx";
import SupportPage from "../pages/Support.jsx";
import Error404 from "../pages/Error404.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/find-bikes" element={<FindBikes />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/process" element={<Process />} />
        <Route path="fleet" element={<FleetPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* AUTH ROUTES (Only for guests) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminStats />} />
          <Route path="stations" element={<StationManagement />} />
          <Route path="bikes" element={<ManageBikes />} />
          <Route path="users" element={<UsersList />} />
          <Route path="tracking" element={<LiveTracking />} />
          <Route path="rides" element={<RidesHistory />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Route>

      {/* USER PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user" element={<UserPanelLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="book-ride" element={<BookRide />} />
          <Route path="my-rides" element={<MyRides />} />
          <Route path="wallet" element={<MyWallet />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Route>

      {/* 404 PAGE */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;