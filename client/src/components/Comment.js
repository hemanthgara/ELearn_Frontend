import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { FaUserEdit } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import CommentReplyForm from "./CommentReplyForm";

import { getApi } from "../helper/apiHelper";
import {
  SHOW_COMMENT,
  SHOW_REPLIES,
  FETCHING_COMMENT,
} from "../redux/types/comment";

import "../style/comment.css";
import { FaReplyAll, FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
// import { useFormik } from "formik";

const Comment = ({ id = "" }) => {
  const dispatch = useDispatch();
  const { comments, replies } = useSelector((state) => state.commentReducer);
  const { pathname } = useLocation();
  const [replyCommentId, setReplyCommentId] = useState([]);
  const fetchCommentRef = useRef(true);

  const getALLQueriesAndReply = () => {
    const comments = getApi(`/api/comments/${id}`);
    const reply = getApi(`/api/replies/${id}`);
    return Promise.all([comments, reply]);
  };

  const getCommentsByVideoId = async (videoId) => {
    dispatch({ type: FETCHING_COMMENT, payload: true });
    dispatch({ type: SHOW_COMMENT, payload: [] });
    dispatch({ type: SHOW_REPLIES, payload: [] });
    const response = await getApi(`/api/comments/${videoId}`);

    if (response.status === 200) {
      if (response.data.data.length > 0) {
        let allComments = response.data.data;
        const commentId = allComments.map((comment) => {
          return comment._id;
        });

        if (commentId.length > 0) {
          let allReply = [];
          for (let i = 0; i < commentId.length; i++) {
            const res = await getApi(`/api/replies/${commentId[i]}`);
            if (res.status === 200) {
              allReply = [...allReply, ...res.data.data];
            }
          }

          dispatch({ type: SHOW_COMMENT, payload: allComments });
          dispatch({ type: SHOW_REPLIES, payload: allReply });
        }
      }
      dispatch({ type: FETCHING_COMMENT, payload: false });

      fetchCommentRef.current = false;
    } else {
      toast.error("Something went wrong");
      fetchCommentRef.current = false;
    }
  };

  useEffect(() => {

    fetchCommentRef.current = true;
    if (!id) {
      dispatch({ type: FETCHING_COMMENT, payload: true });
      getALLQueriesAndReply().then((res) => {
        dispatch({ type: SHOW_COMMENT, payload: res[0].data.data });
        dispatch({ type: SHOW_REPLIES, payload: res[1].data.data });
        dispatch({ type: FETCHING_COMMENT, payload: false });
        fetchCommentRef.current = false;
      });
    } else {
      getCommentsByVideoId(id);
    }
  }, [id]);


  if (fetchCommentRef.current) {
    return (
      <div className="videodetail-container d-flex justify-content-center fs-1 fw-bold">
        {/* <img src="/load.gif" alt="loading" width="300" /> */}
        Please wait...
      </div>
    );
  }

  return (
    <>
      <div className="comments-container container">
        <div className="comments-list">
          {comments.length > 0 && !fetchCommentRef.current ? (
            comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  style={{
                    background: "rgb(225 226 229)",
                    marginBottom: "5px",
                    borderRadius: "15px",
                  }}
                >
                  <div className="comment my-2 fs-5 position-relative">
                    <div className="py-2 d-flex justify-content-between ">
                      <div className="fw-bold">
                        <MdOutlineWatchLater className="pr-2" />{" "}
                        {comment.timeStamp}
                      </div>
                      {pathname === "/viewqueries" ? (
                        <Link to={`/videodetail/${comment.video_id}`}>
                          See video
                        </Link>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <h6 className="fw-bold fs-4">{comment.title}</h6>
                    <div className="d-flex justify-content-between align-items-end">
                      <p className="" style={{ width: "85%" }}>
                        {comment.message}
                      </p>
                      <div
                        className="text-end text-primary fs-6"
                        style={{ width: "15%" }}
                      >
                        <FaUserEdit />{" "}
                        <span className="fs-6">{comment?.user_name}</span>
                      </div>
                    </div>
                    <FaReplyAll
                      role={"button"}
                      className="position-absolute"
                      style={{ bottom: 0, right: "10px" }}
                      onClick={() => setReplyCommentId([comment._id])}
                    />
                  </div>

                  {replyCommentId.includes(comment._id) && (
                    <CommentReplyForm
                      comment={comment}
                      setReplyCommentId={setReplyCommentId}
                    />
                  )}

                  {replies.length > 0 &&
                    replies.map((reply) => {
                      if (reply.comment_id === comment._id) {
                        return (
                          <div
                            key={reply._id}
                            className="comment my-2 fs-5"
                            style={{ marginLeft: "auto" }}
                          >
                            <div className=" d-flex justify-content-between ">
                              <p className="" style={{ width: "85%" }}>
                                {reply.message}
                              </p>

                              <div className="">
                                {pathname === "/viewqueries" ? (
                                  <Link to={`/videodetail/${reply.video_id}`}>
                                    See video
                                  </Link>
                                ) : (
                                  <span></span>
                                )}

                                <div className="text-end text-primary py-3 fs-6">
                                  <FaUserEdit />{" "}
                                  <span className="fs-6">
                                    {reply?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              );
            })
          ) : (
            <span className="fs-5 px-5 mb-4">No comments</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
