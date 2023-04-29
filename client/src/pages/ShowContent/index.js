import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";

import { getApi } from "../../helper/apiHelper";
import { date } from "../../helper/date";

import { useDispatch, useSelector } from "react-redux";
import {
  FETCHING_CONTENT,
  SHOW_CONTENT,
} from "../../redux/types/couserTypes";

import "../../style/showContent.css";

const ShowContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { courseContent, fetchingContent } = useSelector((state) => state.contentReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCHING_CONTENT, payload: true });
    getApi(`/api/cource/videos/${id}`).then((res) => {
      dispatch({ type: SHOW_CONTENT, payload: res.data.data });
      dispatch({ type: FETCHING_CONTENT, payload: false });
    });
  }, []);


  if (fetchingContent) {
    return (
      <div className="videodetail-container d-flex justify-content-center align-items-center fs-1 fw-bold">
        <img src="/load.gif" alt="loading" width="300" />
      </div>
    );
  }

  return (
    <div className="showcontent-container container">
      <div className="container my-5 border-bottom fw-bold relative d-flex justify-content-between">
        <span
          className="fs-5 text-primary"
          role="button"
          onClick={() => navigate(-1)}
        >
          <BiLeftArrowAlt /> Back
        </span>
        <h3 className="fw-bold">Course Content</h3>
        <span className=""></span>
      </div>

      <div className="contents row py-4">
        {courseContent.length > 0 ? (
          courseContent.map((content) => (
            <div key={content._id} className="col-md-6">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 p-0">
                    <img
                      src={process.env.REACT_APP_SERVER_URL + content.imageFile_URL}
                      className="img-fluid rounded-start content-thumb"
                      alt="..."
                    />

                  </div>
                  <div className="col-md-8" style={{ background: '#f0f0f0' }}>
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                      <h5 className="card-title fw-bold">{content.title}</h5>

                      <div className="card-text d-flex justify-content-between align-items-center fw-bold">
                        <p className="m-0">
                          <small className="text-muted">
                            {JSON.parse(JSON.stringify(date(content.createdAt)))}
                          </small>
                        </p>
                        <a
                          className="fw-bold"
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/videodetail/${content._id}`
                            );
                          }}
                        >
                          See video
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No content available</div>
        )}
      </div>
    </div>
  );
};

export default ShowContent;
