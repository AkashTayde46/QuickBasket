import React, { useState } from "react";
import "./sidebar.css";
// import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  if (!user || user?.role !== "admin") {
    return null; // Prevent rendering for non-admins
  }

  // Links data for the sidebar
  const links = [
    { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/admin/orders", icon: <ListAltIcon />, label: "Orders" },
    { to: "/admin/users", icon: <PeopleIcon />, label: "Users" },
    { to: "/admin/reviews", icon: <RateReviewIcon />, label: "Reviews" },
  ];

  // State for managing the "Products" accordion toggle
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="sidebar">
      <NavLink to="/" aria-label="Go to home">
        {/* Optionally add a logo */}
        {/* <img src={logo || "/default-logo.png"} alt="Ecommerce" /> */}
      </NavLink>

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>
            {link.icon} {link.label}
          </p>
        </NavLink>
      ))}

      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <ImportExportIcon />
          <span>Products</span>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink
            to="/admin/product"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <PostAddIcon />
            <p>All</p>
          </NavLink>
          <NavLink
            to="/admin/products/new"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <AddIcon />
            <p>Create</p>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
