import AdminPeople from "./AdminPeople";

const donors = [
  { id: 1, name: "TestDonor", email: "testdonor123@gmail.com", phone: "1234567890", city: "Chennai", joined: "Sep 23, 2026", contributions: "1 donation", verified: false },
  { id: 2, name: "Test Donor", email: "testdonor@example.com", phone: "9876543210", city: "Karur", joined: "Sep 20, 2026", contributions: "22 donations", verified: false },
];

export default function AdminDonors() {
  return (
    <AdminPeople
      kicker="DONORS"
      title="All Donors"
      subtitle="View registered donors and manage verification status."
      noun="Donors"
      initialRows={donors}
    />
  );
}