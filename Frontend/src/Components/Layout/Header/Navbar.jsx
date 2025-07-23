import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Custom styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonOQvb_AbqTFMwTbBfIldtFvPhXQBQsCmfw&s" alt="" /></NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/" activeClassName="active-link" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/products" activeClassName="active-link" className="nav-link">
          Products
        </NavLink>
        
        <NavLink to="/sidebar" activeClassName="active-link" className="nav-link">
          Sidebar
        </NavLink>
        <NavLink to="/combo/create" activeClassName="active-link" className="nav-link">
          Custom Combo
        </NavLink>
      </div>

      <div className="navbar-icons">
        <NavLink to="/search" className="icon">
          <i className="fa fa-search"></i> {/* Search Icon */}
        </NavLink>
        <NavLink to="/cart" className="icon">
          <i className="fa fa-shopping-cart"></i> {/* Cart Icon */}
        </NavLink>
        <NavLink to="/login" className="icon">
          <i className="fa fa-user"></i> {/* Profile Icon */}
        </NavLink>
        
      </div>
    </nav>
  );
};

export default Navbar;
