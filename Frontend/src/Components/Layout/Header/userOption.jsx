import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";  // Updated import
import { useAlert } from "react-alert";
import { logout } from "../../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop"; // Updated import
import DashboardIcon from "@mui/icons-material/Dashboard"; // Updated import
import PersonIcon from "@mui/icons-material/Person"; // Updated import
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Updated import
import ListAltIcon from "@mui/icons-material/ListAlt"; // Updated import
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Updated import
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // If user is not available, return early or show a fallback UI
  if (!user) {
    return null; // or you can return a loading spinner or another fallback UI
  }

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: () => navigate("/orders") },
    { icon: <PersonIcon />, name: "Profile", func: () => navigate("/account") },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: () => {
        dispatch(logout());
        alert.success("Logout Successfully");
      },
    },
  ];

  // Add Dashboard option for admin user
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
