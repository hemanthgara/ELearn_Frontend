import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { BiLeftArrowAlt } from "react-icons/bi";

// redux
import { useDispatch, useSelector } from "react-redux";
import { FETCH_VIDEO, SHOW_VIDEO } from "../../redux/types/video";
import { ADD_COMMENT } from "../../redux/types/comment";

import { VideoDetailQueryValidation } from "../../services/validation";
import useVideoPlayer from "../../services/videoPlayer";
import { getApi, postApi } from "../../helper/apiHelper";

import Comment from "../../componenets/Comment";
import Quize from "../../componenets/Quize";

import "../../style/videodetail.css";

import WebViewer from "@pdftron/webviewer";
import { toast } from "react-toastify";

const VideoDetail = () => {
  const viewer = useRef(null);
  const videoFetch = useRef(false);
  const dispatch = useDispatch();
  const { video, fetchVideo } = useSelector((state) => state.videoReducer);
  const { role } = useSelector((state) => state.authReducer);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  const navigate = useNavigate();
  const { id } = useParams();

  const [vCurrentTime, setVCurrentTime] = useState("00:00");
  const videoRef = useRef(null);

  const initialValues = {
    time: `${minute}:${second}`,
    title: "",
    message: "",
  };

  const handleCommentSubmit = async (values, resetForm) => {
    const response = await postApi(
      "/api/comments",
      {
        title: values.title,
        timeStamp: values.time,
        message: values.message,
        video_id: id,
      },
      {}
    );

    if (response.status === 201) {
      dispatch({ type: ADD_COMMENT, payload: response.data.data });
      toast.success("Comment added");
      resetForm();
    } else {
      toast.error("Something went wrong");
    }
  };

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: VideoDetailQueryValidation,

      onSubmit: (values, { resetForm }) => {
        handleCommentSubmit(values, resetForm);
      },
    });

  const { handleOnTimeUpdate } = useVideoPlayer(videoRef, setVCurrentTime);

  if (videoRef?.current?.duration !== undefined) {
    if (videoRef?.current?.duration === videoRef?.current?.currentTime) {
      setShowQuiz(true);
      videoRef.current.currentTime = 0;
    }
  }

  useEffect(() => {
    videoFetch.current = true;
    dispatch({ type: SHOW_VIDEO, payload: {} });
    dispatch({ type: FETCH_VIDEO, payload: true });

    getApi(`/api/videoCollections/${id}`).then((res) => {
      dispatch({ type: SHOW_VIDEO, payload: res.data.data });
      dispatch({ type: FETCH_VIDEO, payload: false });
      videoFetch.current = false;
    });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      let anotListRes = await getApi(
        `/api/annotations?targetId=${id}&targetName=not_available&PageNumber=1`
      );
      const url = `${process.env.REACT_APP_SERVER_URL}${video?.documentFile_URL}`;

      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer <your_token_here>",
        },
        credentials: "include",
      });
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);

      await WebViewer(
        {
          path: "/lib",
          initialDoc: fileUrl,
          extension: "pdf",
          enableAnnotations: true, // enable the Annotations module
          annotationUser: window.user.first_name + " " + window.user.last_name,
        },
        viewer.current
      ).then(async (instance) => {
        const { documentViewer, annotationManager, Annotations } =
          instance.Core;

        annotationManager.setPermissionCheckCallback((auther, notation) => {
          const cure = notation.getCustomData("custom_data");
          if (!cure) return true;
          const data = JSON.parse(cure);
          if (data.userInfo?.loginId === window.user.loginId) {
            return true;
          } else {
            return false;
          }
        });

        let isAnnoloaded = false;
        documentViewer.addEventListener("annotationsLoaded", async () => {
          for (let i = 0; i < anotListRes.data.data.length; i++) {
            const element = anotListRes.data.data[i];
            let annot = null;

            if (element.ToolName === "AnnotationCreateSticky") {
              annot = new Annotations.StickyAnnotation({
                Id: element.Id,
                Contents: element.Contents,
                PageNumber: element.PageNumber,
                X: element.X,
                Y: element.Y,
                InReplyTo: element.InReplyTo,
                Author: element.Auther,
                Quads: element.Quads,
                Subject: element.Subject,
                StrokeColor: new Annotations.Color(
                  element.Color.R,
                  element.Color.G,
                  element.Color.B,
                  element.Color.A
                ),
                DateCreated: new Date(element.createdAt).toLocaleString(),
              });
            } else if (
              element.ToolName.includes("AnnotationCreateTextHighlight")
            ) {
              annot = new Annotations.TextHighlightAnnotation({
                Id: element.Id,
                Contents: element.Contents,
                PageNumber: element.PageNumber,
                X: element.X,
                Y: element.Y,
                InReplyTo: element.InReplyTo,
                Author: element.Auther,
                Quads: element.Quads,
                Subject: element.Subject,
                StrokeColor: new Annotations.Color(
                  element.Color.R,
                  element.Color.G,
                  element.Color.B,
                  element.Color.A
                ),
                DateCreated: new Date(element.createdAt).toLocaleString(),
              });
            }
            if (element.Contents) {
              annot.setContents(element.Contents);
            }
            annot.setCustomData(
              "custom_data",
              JSON.stringify({
                permissions: ["read", "edit"], // set the permissions for the annotation
                userInfo: {
                  name: element.Auther, // set the name of the user who created the annotation
                  loginId: element.loginId, // set the email of the user who created the annotation
                },
              })
            );

            annotationManager.addAnnotation(annot);
            annotationManager.redrawAnnotation(annot);
          }
          isAnnoloaded = true;
        });

        annotationManager.addEventListener(
          "annotationChanged",
          (annotations, action) => {
            if (!isAnnoloaded) return;

            const url = `http://localhost:4000/api/annotations?action=${action}&targetId=${id}`;

            const formatedAnot = annotations
              .filter((v) =>
                [
                  "AnnotationCreateTextHighlight",
                  "AnnotationCreateSticky",
                ].find((ve) => {
                  return v.ToolName.includes(ve);
                })
              )
              ?.map((anot) => {
                return {
                  targetId: id,
                  Id: anot.Id,
                  Subject: anot.Subject,
                  loginId: window.user.loginId,
                  ToolName: anot.ToolName,
                  Contents: anot.hpa,
                  PageNumber: anot.PageNumber,
                  X: anot.X,
                  Y: anot.Y,
                  Quads: anot.Quads, // array of point if it is a highligh
                  Auther: anot.Author,
                  Color: anot.Color,
                  InReplyTo: anot.InReplyTo, // parent id if it is a reply
                };
              });

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer <your_token_here>",
              },

              credentials: "include",
              body: JSON.stringify(formatedAnot),
            });
          }
        );
      });
    };

    if (!video?.documentFile_URL || videoFetch.current) {
      return;
    }
    fetchData();
  }, [video?.documentFile_URL, viewer]);

  if (!fetchVideo) {
    if (Object.keys(video).length > 0) {
      return (
        <>
          <div>
            {showQuiz && role === "student" && (
              <Quize id={video._id} setShowQuiz={setShowQuiz} />
            )}
          </div>

          <div className="videodetail-container">
            <div className="container my-5 border-bottom fw-bold relative d-flex justify-content-between">
              <span
                className="fs-5 text-primary"
                role="button"
                onClick={() => navigate(-1)}
              >
                <BiLeftArrowAlt /> Back
              </span>
              <h3 className="fw-bold">{video?.title}</h3>

              {role === "student" ? (
                // <a
                //   href={`${process.env.REACT_APP_SERVER_URL}${video?.documentFile_URL}`}
                //   download
                //   alt={`${video?.videoFile_name}`}
                //   className="align-self-end"
                //   target="_blank"
                //   rel="noreferrer"
                // >
                //   Download Document <FaDownload className="pl-3" />
                // </a>\
                <button
                  className="btn btn-primary"
                  onClick={() => setShowQuiz(true)}
                >
                  Show quiz
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/addQuestion/${video._id}`)}
                >
                  Add questions
                </button>
              )}
            </div>

            <div className="container row mx-auto">
              <div
                className={`vidoe-container ${
                  role === "student" ? "col-md-6" : "col-md-12"
                } `}
              >
                <video
                  className="w-100"
                  controls
                  controlsList="nodownload"
                  ref={videoRef}
                  onTimeUpdate={handleOnTimeUpdate}
                >
                  <source
                    src={`${process.env.REACT_APP_SERVER_URL}${video?.videoFile_URL}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>


              {role === "student" && (
                <>
                  <div className="query-container col-md-6 p-0">
                    <form onSubmit={handleSubmit} className="form-floating">
                      <div className="">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="time"
                            name="time"
                            placeholder="Time"
                            value={values.time}
                            onChange={() => {
                              return
                            }}
                            onClick={() => {
                              setShowTimeStamp(!showTimeStamp);
                            }}
                          />
                          <label htmlFor="time">Time</label>
                        </div>
                        {touched.time && errors.time ? (
                          <span className="invalid-val">* {errors.time}</span>
                        ) : null}

                        <div
                          className={`position-relative d-flex timestamp ${
                            showTimeStamp ? "show" : "hide"
                          }`}
                          style={{ marginLeft: "10px", width: "100px" }}
                        >
                          <div
                            className="d-flex flex-column position-absolute"
                            style={{
                              zIndex: "10",
                              height: "10rem",
                              overflowY: "auto",
                            }}
                          >
                            {timeStamp.map((time) => (
                              <span
                                key={time}
                                className={`border p-2 text-light ${
                                  minute === time ? "bg-primary" : "bg-dark"
                                } `}
                                onClick={() => {
                                  setMinute(time);
                                  setFieldValue("time", `${time}:${second}`);
                                }}
                              >
                                {time}
                              </span>
                            ))}
                          </div>

                          <div className="position-absolute end-0">
                            <div
                              className="d-flex flex-column position-relative"
                              style={{
                                zIndex: "10",
                                height: "10rem",
                                overflowY: "auto",
                              }}
                            >
                              {timeStamp.map((time) => {
                                return (
                                  <span
                                    key={time}
                                    className={`border p-2 text-light ${
                                      second === time ? "bg-primary" : "bg-dark"
                                    }`}
                                    onClick={() => {
                                      setSecond(time);
                                      setFieldValue(
                                        "time",
                                        `${minute}:${time}`
                                      );
                                    }}
                                  >
                                    {time}
                                  </span>
                                );
                              })}
                            </div>

                            <button
                              type="button"
                              className="btn btn-secondary position-relative"
                              style={{ zIndex: "10" }}
                              onClick={() => setShowTimeStamp(false)}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="my-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={values["title"]}
                            onFocus={() => {
                              
                              setShowTimeStamp(false);
                              if (vCurrentTime.split(":").length === 2) {
                                setMinute(`${vCurrentTime.split(":")[0]}`);
                                setSecond(`${vCurrentTime.split(":")[1]}`);
                                setFieldValue(
                                  "time",
                                  `${vCurrentTime.split(":")[0]}:${
                                    vCurrentTime.split(":")[1]
                                  }`
                                );
                              } else {
                                setFieldValue(
                                  "time",
                                  JSON.parse(JSON.stringify(vCurrentTime))
                                );
                              }
                            }}
                            onChange={handleChange}
                          />
                          <label htmlFor="title">Title</label>
                        </div>

                        {touched.title && errors.title ? (
                          <span className="invalid-val">* {errors.title}</span>
                        ) : null}
                      </div>

                      <div>
                        <div className="form-floating">
                          <textarea
                            name="message"
                            className="form-control"
                            onChange={handleChange}
                            value={values.message}
                            cols="7"
                            rows={"4"}
                            placeholder="Description"
                            style={{ minHeight: "8rem", maxHeight: "8rem" }}
                          ></textarea>
                          <label htmlFor="floatingTextarea2">Message</label>
                        </div>

                        {touched.message && errors.message ? (
                          <span className="invalid-val">
                            * {errors.message}
                          </span>
                        ) : null}
                      </div>

                      <div className="form-floating my-4">
                        <button
                          type="submit"
                          className=" w-100 py-2 btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}

              {/* <iframe className='col-12 mt-2' width={1000} height={450} src={`${process.env.REACT_APP_SERVER_URL}${video?.documentFile_URL}`}>
              </iframe> */}
              {fetchVideo.current ? <span>Please wait...</span> : <div
                className="webviewer"
                ref={viewer}
                style={{ height: "100vh" }}
              ></div>}
              
            </div>

            <div className="container my-2">
              <span className="fw-bold fs-4 px-2">Comments</span>
            </div>
            <div className="mb-5 video-commments-container container">
              <Comment id={id} />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="videodetail-container d-flex justify-content-center align-items-center fs-1 fw-bold">
          content unavailable
        </div>
      );
    }
  } else {
    return (
      <div className="videodetail-container d-flex justify-content-center align-items-center fs-1 fw-bold">
        <img src="/load.gif" alt="loading" width="300" />
      </div>
    );
  }
};

export default VideoDetail;

let timeStamp = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
