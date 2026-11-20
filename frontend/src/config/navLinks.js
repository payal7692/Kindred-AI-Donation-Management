import {
  Home, Camera, Users, Package, Truck, User,
  ClipboardList, Cog, UserCog, Building2, Heart, Link2,
} from "lucide-react";

export const donorLinks = [
  { to: "/donor", label: "Overview", icon: Home, end: true },
  { to: "/donor/scan", label: "Scan Items", icon: Camera },
  { to: "/donor/matches", label: "Matches", icon: Users },
  { to: "/donor/donations", label: "Donations", icon: Package },
  { to: "/donor/pickup", label: "Pickup", icon: Truck },
  { to: "/donor/profile", label: "Profile", icon: User },
];

export const ngoLinks = [
  { to: "/ngo", label: "Overview", icon: Home, end: true },
  { to: "/ngo/demands", label: "Demands", icon: ClipboardList },
  { to: "/ngo/matches", label: "Matches", icon: Users },
  { to: "/ngo/donations", label: "Donations", icon: Package },
  { to: "/ngo/operations", label: "Operations", icon: Cog },
  { to: "/ngo/staff", label: "Staff", icon: UserCog },
  { to: "/ngo/profile", label: "Profile", icon: User },
];

export const adminLinks = [
  { to: "/admin", label: "Overview", icon: Home, end: true },
  { to: "/admin/ngos", label: "NGOs", icon: Building2 },
  { to: "/admin/donors", label: "Donors", icon: Heart },
  { to: "/admin/donations", label: "Donations", icon: Package },
  { to: "/admin/demands", label: "Demands", icon: ClipboardList },
  { to: "/admin/matches", label: "Matches", icon: Link2 },
];