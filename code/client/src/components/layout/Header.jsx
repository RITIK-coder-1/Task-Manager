import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full h-24 border">
      <nav className="flex justify-center items-center gap-3">
        <Link to="/"> Home </Link> |<Link to="/login">Log in</Link> |
        <Link to="/dashboard">Dashboard</Link> |
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
