import React from "react";
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      {/* Left Section */}
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      {/* Middle Section */}
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; </p>
      </div>

      {/* Right Section */}
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
