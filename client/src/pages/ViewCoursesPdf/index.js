import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import JSZip from "jszip";
import saveAs from "file-saver";

import "../../style/ViewCoursesPdf.css";
import { FETCHING_COURSE, SHOW_COURSE } from "../../redux/types/couserTypes";
import { getApi } from "../../helper/apiHelper";
import axios from "axios";
import { toast } from "react-toastify";

const index = () => {
  const [fetchingPdf, setFetchingPdf] = useState({
    courseId: "",
    fetching: false,
  });
  const dispatch = useDispatch();
  const { courses, fetchingCourses } = useSelector(
    (state) => state.courseReducer
  );

  const downloadAllPdf = async (course_id, course_name) => {
    setFetchingPdf({ courseId: course_id, fetching: true });
    const response = await getApi(`/api/videoCollections/course/${course_id}`);

    let pdfResponses = [];
    if (response.data.data.length) {
      for (let i = 0; i < response.data.data.length; i++) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}${response.data.data[i].documentFile_URL}`,
          { withCredentials: true, responseType: "blob" }
        );
        pdfResponses.push(res);
      }

      // Use jsZip to create a zip file
      const zip = new JSZip();

      // Add each PDF file to the zip file
      pdfResponses.forEach((response, index) => {
        const fileName = `pdf${index + 1}.pdf`;
        zip.file(fileName, response.data);
      });

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });

      // Prompt the user to download the zip file
      saveAs(content, `${course_name}.zip`);
    } else {
      toast.error("Pdf's unavailable", {
        theme: "colored",
      });
    }
    setFetchingPdf({ courseId: "", fetching: false });
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

  return (
    <div className="viewcoursepdf">
      <div className="container course-container">
        <div className="wrapper">
          {courses.length ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="card mx-3"
                style={{ width: "18rem" }}
              >
                <img
                  src={`http://localhost:4000/api${course.file_URL}`}
                  className="card-img-top"
                  alt="..."
                  style={{ maxHeight: "15rem", minHeight: "15rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{course.name}</h5>
                  <p className="card-text">{`${course.about_cource.slice(
                    0,
                    100
                  )}...`}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => downloadAllPdf(course._id, course.name)}
                  >
                    {fetchingPdf.fetching && fetchingPdf.courseId === course._id
                      ? "Please wait..."
                      : "Download Pdf's"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Courses Unavaible</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
