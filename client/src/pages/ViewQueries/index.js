import React from "react";

import Comment from "../../componenets/Comment";

import "../../style/viewqueries.css";

const ViewQueries = () => {
  return (
    <>
      <div className="queries-container container mb-2">
        <span className="fw-bold fs-4 px-2">Comments</span>
        <div className="query-comment-list">
          <Comment />
        </div>
      </div>
    </>
  );
};

export default ViewQueries;
