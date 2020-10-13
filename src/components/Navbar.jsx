import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { withRouter } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.mobileMenu = createRef();
  }
  closeMenu = () => {
    this.mobileMenu.current.classList.remove("open_mobile_menu");
  };
  openMenu = () => {
    this.mobileMenu.current.classList.toggle("open_mobile_menu");
  };
  render() {
    return (
      <div className="navbar_container">
        <div className="container">
          <div className="desktop_menu">
            <ul className="navbar_items">
              <NavItems />
            </ul>
          </div>
          <div className="mobile_menu_container">
            <div className="burger" onClick={this.openMenu}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="mobile_menu" ref={this.mobileMenu}>
              <ul>
                <NavItems />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function NavItems() {
  function logout() {
    alert("logout");
  }
  return (
    <>
      <li className="navbar_item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar_item">
        <Link to="/login">Login</Link>
      </li>
      <li className="navbar_item">
        <Link to="/signup">Signup</Link>
      </li>
      <li
        className="navbar_item"
        onClick={() => {
          logout();
        }}
      >
        Log Out
      </li>
    </>
  );
}

export default withRouter(Navbar);
