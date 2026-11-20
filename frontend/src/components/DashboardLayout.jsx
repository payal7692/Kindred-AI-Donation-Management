import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { Heart, Bell, LogOut } from "lucide-react";
import "./DashboardLayout.css";

export default function DashboardLayout({ links, userEmail }) {
  const navigate = useNavigate();

  return (
    <div className="dash">
      <aside className="sidebar">
        <div>
          <Link to="/" className="sb-brand">
            <Heart size={26} fill="currentColor" />
            <div>
              <strong>Kindred</strong>
              <span>A kinder tomorrow, together</span>
            </div>
          </Link>

          <div className="sb-tools">
            <select className="sb-lang">
              <option>English</option>
              <option>हिन्दी</option>
              <option>বাংলা</option>
            </select>
            <button type="button" className="sb-bell">
              <Bell size={18} />
            </button>
          </div>
        </div>

        <nav className="sb-nav">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => "sb-link" + (isActive ? " active" : "")}
              >
                <Icon size={20} />
                <span>{l.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div>
          <div className="sb-user">
            <span className="avatar">{userEmail.slice(0, 2).toUpperCase()}</span>
            <span className="sb-email">{userEmail}</span>
          </div>
          <button type="button" className="sb-logout" onClick={() => navigate("/login")}>
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  );
}