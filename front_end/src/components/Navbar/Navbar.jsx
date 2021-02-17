import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar } from "@material-ui/core";
import "./Navbar.css";
import Axios from "axios";

function Navbar(props) {
  const { isCookies, setIsCookies } = props.prop;
  const [profilePic, setProfilePic] = useState({
    imageLink: "",
    username: "",
  });

  useEffect(() => {
    if (Cookies.get("auth_token")) {
      setIsCookies(true);
      Axios.post(
        "http://localhost:5000/get-profile-pic",
        {},
        {
          headers: {
            "X-custom-Auth_token": Cookies.get("auth_token"),
          },
        }
      )
        .then((res) => {
          setProfilePic({
            imageLink: res.data.msg,
            username: res.data.username,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setIsCookies(false);
    }
  }, [isCookies]);

  function logout() {
    Cookies.remove("auth_token");
    setIsCookies(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/secret">
                Secret
              </NavLink>
            </li>
            {isCookies ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout} to="/">
                    Logout
                  </Link>
                </li>
                <li className="dropdown">
                  <Avatar
                    className="dropdown-toggle"
                    alt={profilePic.username}
                    src={profilePic.imageLink}
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="none"
                  />

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/profilepic">
                      Change Profile Pic
                    </Link>
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
