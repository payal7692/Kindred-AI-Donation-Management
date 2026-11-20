import AdminPeople from "./AdminPeople";

const ngos = [
  { id: 1, name: "Test Community NGO", email: "testngo@example.com", phone: "9000000001", city: "Chennai", joined: "Sep 20, 2026", contributions: "16 demands", verified: true },
];

export default function AdminNgos() {
  return (
    <AdminPeople
      kicker="NGOS"
      title="All NGOs"
      subtitle="View registered NGOs and manage verification status."
      noun="NGOs"
      initialRows={ngos}
    />
  );
}