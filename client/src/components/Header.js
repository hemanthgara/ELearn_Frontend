import React, { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

import "../style/header.css";

import Footer from "./Footer";

import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import getCookie from "../helper/getCookie";

const Header = () => {
  const { userReducer, authReducer } = useSelector((state) => state);
  const token = getCookie("token");
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navToggle, setNavToggle] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });

    document.cookie = "token=; path=/;";
    navigate("/signin");
  };

  if (pathname === "/addcourse" && authReducer.role === "student") {
    window.location.href = "*";
  }

  if (!token) {
    return (
      <>
        <div className="navigation-container w-100">
          <header className=" d-flex justify-content-between py-3 px-5">
            <div className="text-primary fs-3 fw-bold d-flex align-items-center">
              <span>E-learning</span>
            </div>

            <ul className="role-list-register navbar-nav mb-2 mb-lg-0 d-flex align-items-center flex-row text-primary fs-5">
              <li className="nav-item px-2">
                <div
                  className="signup-list nav-link dropdown-toggle text-primary"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign Up
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item text-primary" to="/signup">
                      As Student
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item text-primary"
                      to="/facilitator"
                    >
                      As Faculty
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </header>
        </div>

        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="navigation-container w-100">
        <header className=" d-flex justify-content-between py-3 px-5">
          <div className="text-primary fs-3 fw-bold d-flex align-items-center">
            <span>E-learning</span>
          </div>
          <ul className="nav nav-pills fs-5 d-flex align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/viewcourse">
                View Course
              </NavLink>
            </li>
            {authReducer.role === "faculty" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addcourse">
                    Add Course
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/viewqueries">
                View Queries
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/helpdesk">
                Help Desk
              </NavLink>
            </li>
          </ul>

          <ul className="role-list-register navbar-nav mb-2 mb-lg-0 d-flex align-items-center flex-row text-primary fs-5">
            {!userReducer.loggedInUser ? (
              <>
                <li className="nav-item px-2">
                  <div
                    className="signup-list nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sign Up
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        As Student
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/facilitator">
                        As Faculty
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link" to="/signin">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <div className="dropdown text-end d-flex">
                  <a
                    href="#"
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle size="30px" color="blue" />
                  </a>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setNavToggle(!navToggle)}
                  >
                    {!navToggle ? <RxHamburgerMenu /> : <AiOutlineClose />}
                  </button>

                  <ul className="dropdown-menu text-small">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        to="#"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogout}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </header>
      </div>

      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
