import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {

  const {user} = useContext(AuthContext)
  console.log(user);
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        {/* a*4[href=$]{$} */}s
        <Link to="/">Shop</Link>
        <Link to="/orders">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign-Up</Link>
        {
        user && <span>Welcome {user.email}</span>
        }
      </div>
    </nav>
  );
};

export default Header;
