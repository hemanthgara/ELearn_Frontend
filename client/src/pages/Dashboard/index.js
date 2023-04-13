import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { MdAddchart, MdMenuBook, MdQueryStats } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";

import { useSelector } from "react-redux";

import "../../style/dashboard.css";

const Dashboard = () => {
  const { role } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  if (role === "student") {
    return (
      <>
        <div
          className="container dashboard-container"
        >
          <div className="">
            <div className="row ">
              <div
                className="col-xl-6 col-lg-6 cursor-pointer"
                role="button"
                onClick={() => navigate("/viewcourse")}
              >
                <div className="card l-bg-blue-dark">
                  <div className="card-statistic-3 px-4 py-5">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">View Course</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0">
                          <MdMenuBook />
                        </h2>
                      </div>
                      <div className="col-4 text-center fs-2">
                        <span>
                          <HiArrowRight />
                        </span>
                      </div>
                    </div>
                    <div
                      className="progress mt-1 "
                      data-height="8"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar l-bg-green"
                        role="progressbar"
                        data-width="25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 cursor-pointer"
                role="button"
                onClick={() => navigate("/viewqueries")}
              >
                <div className="card l-bg-blue-dark">
                  <div className="card-statistic-3 px-4 py-5">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">View Query</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0">
                          <MdQueryStats />
                        </h2>
                      </div>
                      <div className="col-4 text-centert fs-2">
                        <span>
                          <HiArrowRight />
                        </span>
                      </div>
                    </div>
                    <div
                      className="progress mt-1 "
                      data-height="8"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar l-bg-green"
                        role="progressbar"
                        data-width="25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <div
        className="container dashboard-container"
      >
        <div className="">
          <div className="row ">
            <div
              className="col-xl-4 col-lg-6 cursor-pointer"
              role="button"
              onClick={() => navigate("/addcourse")}
            >
              <div className="card l-bg-blue-dark">
                <div className="card-statistic-3 px-4 py-5">
                  <div className="card-icon card-icon-large">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="mb-4">
                    <h5 className="card-title mb-0">Add Course</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        <MdAddchart />
                      </h2>
                    </div>
                    <div className="col-4 text-center fs-2">
                      <span>
                        <HiArrowRight />
                      </span>
                    </div>
                  </div>
                  <div
                    className="progress mt-1 "
                    data-height="8"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="progress-bar l-bg-green"
                      role="progressbar"
                      data-width="25%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 cursor-pointer"
              role="button"
              onClick={() => navigate("/viewcourse")}
            >
              <div className="card l-bg-blue-dark">
                <div className="card-statistic-3 px-4 py-5">
                  <div className="card-icon card-icon-large">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="mb-4">
                    <h5 className="card-title mb-0">View Course</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        <MdMenuBook />
                      </h2>
                    </div>
                    <div className="col-4 text-center fs-2">
                      <span>
                        <HiArrowRight />
                      </span>
                    </div>
                  </div>
                  <div
                    className="progress mt-1 "
                    data-height="8"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="progress-bar l-bg-green"
                      role="progressbar"
                      data-width="25%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 cursor-pointer"
              role="button"
              onClick={() => navigate("/viewqueries")}
            >
              <div className="card l-bg-blue-dark">
                <div className="card-statistic-3 px-4 py-5">
                  <div className="card-icon card-icon-large">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="mb-4">
                    <h5 className="card-title mb-0">View Query</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        <MdQueryStats />
                      </h2>
                    </div>
                    <div className="col-4 text-centert fs-2">
                      <span>
                        <HiArrowRight />
                      </span>
                    </div>
                  </div>
                  <div
                    className="progress mt-1 "
                    data-height="8"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="progress-bar l-bg-green"
                      role="progressbar"
                      data-width="25%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
