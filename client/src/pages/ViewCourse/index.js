import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiEye } from "react-icons/hi";
// import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COURSE,
  FETCHING_COURSE,
  SHOW_COURSE,
} from "../../redux/types/couserTypes";

import AddCourseContent from "../../componenets/AddCourseContent";
import { deleteApi, getApi } from "../../helper/apiHelper";

import "../../style/viewcourse.css";
import { toast } from "react-toastify";

const ViewCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.authReducer);

  const { courses, fetchingCourses } = useSelector(
    (state) => state.courseReducer
  );

  const deleteCourse = async (course_id) => {
    if (confirm("Are you sure do you want to delete this course?")) {
      dispatch({ type: FETCHING_COURSE, payload: true });
      const response = await deleteApi(`/api/Cources/${course_id}`);
      if (response.status === 200) {
        toast.success("Course deleted successfully!!!");
        dispatch({ type: DELETE_COURSE, payload: course_id });
        dispatch({ type: FETCHING_COURSE, payload: false });
      }
    }
    return;
  };

  useEffect(() => {
    dispatch({ type: FETCHING_COURSE, payload: true });
    getApi("api/Cources").then((res) => {
      dispatch({ type: SHOW_COURSE, payload: res.data.data });
      dispatch({ type: FETCHING_COURSE, payload: false });
    });

  }, []);

  if (fetchingCourses) {
    return (
      <div className="videodetail-container d-flex justify-content-center align-items-center fs-1 fw-bold">
        <img src="/load.gif" alt="loading" width="300" />
      </div>
    );
  }

  if (role === "student") {
    return (
      <>
        <div className="view-course-wrap">
          <h2 className="container text-center fw-bold border-bottom fs-3">
            Course List
          </h2>
          <div className="course-list-wrap">
            <div className="container">
              {/* <div className="course-search-box d-flex justify-content-end pb-4">
                <div className="d-flex w-50" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by Name"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    Search
                  </button>
                </div>
              </div> */}

              {/* add table */}

              <div className="courseTable">
                <div className="table-wrapper">
                  <table className="fl-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Language</th>
                        <th>Description</th>

                        <th>Show Content</th>
                        <th>Quiz Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((course, index) => {
                          return (
                            <tr key={index + 1}>
                              <td style={{ width: "5%" }}>{index + 1}</td>
                              <td style={{ width: "10%" }}>
                                <div
                                  style={{
                                    maxHeight: "45px",
                                    minHeight: "45px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={`http://localhost:4000/api${course.file_URL}`}
                                    alt=""
                                    style={{ width: "50px" }}
                                  />
                                </div>
                              </td>
                              <td style={{ width: "10%" }}>{course.name}</td>
                              <td style={{ width: "10%" }}>
                                {course.language}
                              </td>
                              <td
                                style={{
                                  width: "40%",
                                  whiteSpace: "break-spaces",
                                }}
                              >
                                <div className="">
                                  {`${course.description.slice(0, 100)}...`}
                                </div>
                              </td>

                              <td style={{ width: "10%" }}>
                                <HiEye
                                  className="text-primary fs-5"
                                  role="button"
                                  onClick={() =>
                                    navigate(
                                      `/viewcourse/showcontent/${course._id}`
                                    )
                                  }
                                />
                              </td>

                              <td style={{ width: "10%" }}>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    navigate(`/doc/${course._id}`, {
                                      state: {
                                        courseName: course.name,
                                      },
                                    })
                                  }
                                >
                                  Get
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td className="w-100">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* pagination */}

              {/* <div className="d-flex justify-content-end mt-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="view-course-wrap">
        <h2 className="container text-center fw-bold border-bottom fs-3">
          Course List
        </h2>
        <div className="course-list-wrap">
          <div className="container">
            <div className="course-search-box d-flex justify-content-end pb-4">
              <div className="d-flex w-50" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search by Name"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </div>
            </div>

            {/* add table */}

            <div className="courseTable">
              <div className="table-wrapper">
                <table className="fl-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Language</th>
                      <th>Description</th>
                      <th>Action</th>
                      <th>Add Content</th>
                      <th>Show Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length > 0 ? (
                      courses.map((course, index) => {
                        return (
                          <tr key={index + 1}>
                            <td style={{ width: "5%" }}>{index + 1}</td>
                            <td style={{ width: "10%" }}>
                              <div
                                style={{
                                  maxHeight: "45px",
                                  minHeight: "45px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={`http://localhost:4000/api${course.file_URL}`}
                                  alt=""
                                  style={{ width: "50px" }}
                                />
                              </div>
                            </td>
                            <td style={{ width: "10%" }}>{course.name}</td>
                            <td style={{ width: "10%" }}>{course.language}</td>
                            <td
                              style={{
                                width: "40%",
                                whiteSpace: "break-spaces",
                              }}
                            >
                              <div className="">
                                {`${course.description.slice(0, 100)}...`}
                              </div>
                            </td>
                            <td style={{ width: "10%" }}>
                              <div className="d-flex justify-content-around">
                                {/* <FaRegEdit
                                    className="text-primary fs-5"
                                    role="button"
                                    onClick={() => console.log(course._id)}
                                  /> */}
                                <RiDeleteBin6Line
                                  className="text-danger fs-5"
                                  role="button"
                                  onClick={() => deleteCourse(course._id)}
                                />
                              </div>
                            </td>
                            <td style={{ width: "5%" }}>
                              {" "}
                              <AddCourseContent
                                language={course.language}
                                _id={course._id}
                              />
                            </td>
                            <td style={{ width: "10%" }}>
                              <HiEye
                                className="text-primary fs-5"
                                role="button"
                                onClick={() =>
                                  navigate(
                                    `/viewcourse/showcontent/${course._id}`
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="w-100">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* pagination */}

            <div className="d-flex justify-content-end mt-3">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
