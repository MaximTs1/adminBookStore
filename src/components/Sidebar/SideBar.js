import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

// All the svg files
import logo from "../../assets/logo.svg";
import Home from "../../assets/home-solid.svg";
import Team from "../../assets/social.svg";
import Projects from "../../assets/starred.svg";
import Documents from "../../assets/draft.svg";
import PowerOff from "../../assets/power-off-solid.svg";
import Book from "../../assets/Book.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { logout } = useAuth();

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Function to determine the class name based on active state
  const getNavLinkClass = (isActive) => (isActive ? "item active" : "item");

  return (
    <div className="container">
      <button
        className={`button ${click ? "clicked" : ""}`}
        onClick={() => handleClick()}
      ></button>
      <div className="sidebarContainer">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className={`slickBar ${click ? "clicked" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={() => setClick(false)}
          >
            <img src={Home} alt="Documents" />
            <span className={`text ${click ? "clicked" : ""}`}>Home</span>
          </NavLink>

          <NavLink
            to="/addcard"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={() => setClick(false)}
          >
            <img src={Documents} alt="Home" />
            <span className={`text ${click ? "clicked" : ""}`}>Add Item</span>
          </NavLink>

          <NavLink
            to="/usermanage"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={() => setClick(false)}
          >
            <img src={Team} alt="usermanage" />
            <span className={`text ${click ? "clicked" : ""}`}>UserManage</span>
          </NavLink>

          <NavLink
            to="/bookmanage"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={() => setClick(false)}
          >
            <img src={Book} alt="BookManage" />
            <span className={`text ${click ? "clicked" : ""}`}>BookManage</span>
          </NavLink>

          <NavLink
            to="/Order"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={() => setClick(false)}
          >
            <img src={Projects} alt="Order" />
            <span className={`text ${click ? "clicked" : ""}`}>Order</span>
          </NavLink>
        </ul>

        <div className={`profile ${profileClick ? "clicked" : ""}`}>
          <img
            onClick={() => handleProfileClick()}
            src="https://picsum.photos/200"
            alt="Profile"
          />
          <div className={`details ${profileClick ? "clicked" : ""}`}>
            <div className="name">
              <h4>Hello&nbsp;Ariella</h4>
              <a href="/#">view&nbsp;profile</a>
            </div>

            <button className="logout" onClick={handleLogout}>
              <img src={PowerOff} alt="logout" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
