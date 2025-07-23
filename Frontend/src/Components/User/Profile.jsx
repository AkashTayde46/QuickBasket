import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import {logout} from "../../action/userAction"
import "./Profile.css";
import { useDispatch } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, loading]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/logout");
  };

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title={`${user?.name || "User"}'s Profile`} />
      <div className="homeLink">
        <Link to="/">🏠 Home</Link>
      </div>
      <div className="profileContainer">
     
        <div>
          <h1>My Profile</h1>
          <Link to="/me/update">Edit Profile</Link>
          
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user?.name || "N/A"}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user?.email || "N/A"}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{user?.createdAt ? String(user.createdAt).substr(0, 10) : "N/A"}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
