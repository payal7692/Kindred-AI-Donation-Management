import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScanItems from "./pages/ScanItems";
import Placeholder from "./pages/Placeholder";
import ProfilePage from "./pages/ProfilePage";
import DashboardLayout from "./components/DashboardLayout";
import MatchesView from "./components/MatchesView";
import DonorOverview from "./pages/donor/DonorOverview";
import DonorDonations from "./pages/donor/DonorDonations";
import DonationDetail from "./pages/donor/DonationDetail";
import DonorPickup from "./pages/donor/DonorPickup";
import NgoOverview from "./pages/ngo/NgoOverview";
import NgoDemands from "./pages/ngo/NgoDemands";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminDonors from "./pages/admin/AdminDonors";
import AdminNgos from "./pages/admin/AdminNgos";
import { donorLinks, ngoLinks, adminLinks } from "./config/navLinks";
import NgoDonations from "./pages/ngo/NgoDonations";
import NgoOperations from "./pages/ngo/NgoOperations";
import NgoStaff from "./pages/ngo/NgoStaff";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminDemands from "./pages/admin/AdminDemands";
import AdminMatches from "./pages/admin/AdminMatches";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/scan" element={<ScanItems />} />

      <Route
        path="/donor"
        element={<DashboardLayout links={donorLinks} userEmail="testdonor@example.com" />}
      >
        <Route index element={<DonorOverview />} />
        <Route path="scan" element={<ScanItems />} />
        <Route path="matches" element={<MatchesView role="donor" />} />
        <Route path="donations" element={<DonorDonations />} />
        <Route path="donations/:id" element={<DonationDetail />} />
        <Route path="pickup" element={<DonorPickup />} />
        <Route path="profile" element={<ProfilePage role="donor" />} />
      </Route>

      <Route
        path="/ngo"
        element={<DashboardLayout links={ngoLinks} userEmail="testngo@example.com" />}
      >
        <Route index element={<NgoOverview />} />
        <Route path="demands" element={<NgoDemands />} />
        <Route path="matches" element={<MatchesView role="ngo" />} />
        <Route path="donations" element={<NgoDonations />} />
        <Route path="operations" element={<NgoOperations />} />
        <Route path="staff" element={<NgoStaff />} />
        <Route path="profile" element={<ProfilePage role="ngo" />} />
      </Route>

      <Route
        path="/admin"
        element={<DashboardLayout links={adminLinks} userEmail="testadmin@example.com" />}
      >
        <Route index element={<AdminOverview />} />
        <Route path="ngos" element={<AdminNgos />} />
        <Route path="donors" element={<AdminDonors />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="demands" element={<AdminDemands />} />
        <Route path="matches" element={<AdminMatches />} />
      </Route>
    </Routes>
  );
}