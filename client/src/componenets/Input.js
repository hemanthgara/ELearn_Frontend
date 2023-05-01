import React from "react";

const Input = (props) => {
  return (
    <>
      <input
         type={props.type}
         className="form-control"
         id={props.id}
         name={props.name}
         disabled={props.disable ? true : false}
         placeholder={props.placeholder}
         value={props.values[props.name]}
         onChange={props.handleChange}
      />
      <label htmlFor={props.htmlLabelFor}>{props.htmlLabelName}</label>
    </>
  );
};

export default Input;
