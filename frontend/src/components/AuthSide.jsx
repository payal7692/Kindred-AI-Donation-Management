import { Link } from "react-router-dom";
import { Heart, Leaf, Users } from "lucide-react";

export default function AuthSide() {
  return (
    <div className="auth-side">
      <Link to="/" className="auth-brand">
        <Heart size={28} fill="currentColor" />
        <div>
          <strong>Kindred</strong>
          <span>A kinder tomorrow, together</span>
        </div>
      </Link>

      <div>
        <p className="eyebrow">WELCOME TO KINDRED</p>
        <h1>
          Kindness creates
          <br />
          real <em>change.</em>
        </h1>
        <p className="lead">
          A trusted platform connecting generous donors with verified NGOs to
          ensure resources reach the people who need them most.
        </p>

        <ul className="points">
          <li>
            <span className="pt-icon"><Heart size={20} /></span>
            <div><strong>Meaningful Donations</strong><span>Give items a second life</span></div>
          </li>
          <li>
            <span className="pt-icon"><Leaf size={20} /></span>
            <div><strong>Verified NGOs</strong><span>Trusted and accountable</span></div>
          </li>
          <li>
            <span className="pt-icon"><Users size={20} /></span>
            <div><strong>Stronger Communities</strong><span>Resources reaching those who need them</span></div>
          </li>
        </ul>
      </div>

      <p className="tagline">A KINDER TOMORROW, TOGETHER</p>
    </div>
  );
}