import React from "react";
import { useFormik } from "formik";

import Input from "../../componenets/Input";

import { helpFormValidation } from "../../services/validation";
import { postApi } from "../../helper/apiHelper"

import "../../style/helpdesk.css";
import { toast } from "react-toastify";

const HelpDesk = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleOnSubmit = async (values, resetForm) => {
    const response = await postApi("/api/help-desks", { ...values }, { "Content-Type": "application/json" });
    if (response.status === 201) {
      toast.success('Message send!!!');
      resetForm();
    }
  }

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues,

    validationSchema: helpFormValidation,

    onSubmit: (values, { resetForm }) => {
      handleOnSubmit(values, resetForm);
    },
  });

  return (
    <>
      <div
        className="help-container d-flex justify-content-center align-items-center"

      >
        <div className="w-50 text-left my-3 py-3 bg-light">
          <span className="d-block text-center fs-3 fw-bold pt-3">Help</span>

          <form className="form-floating my-5 px-5" onSubmit={handleSubmit}>
            <div className="my-3">
              <div className="form-floating">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  htmlLabelName="Name"
                  htmlLabelFor="name"
                  values={values}
                  handleChange={handleChange}
                  placeholder="Name"
                />
              </div>

              {touched.name && errors.name ? (
                <span className="invalid-val">* {errors.name}</span>
              ) : null}
            </div>

            <div className="my-3">
              <div className="form-floating">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  htmlLabelName="Email"
                  htmlLabelFor="email"
                  values={values}
                  handleChange={handleChange}
                  placeholder="Email"
                />
              </div>

              {touched.email && errors.email ? (
                <span className="invalid-val">* {errors.email}</span>
              ) : null}
            </div>

            <div className="my-3">
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
                <label htmlFor="floatingTextarea2">Question</label>
              </div>

              {touched.message && errors.message ? (
                <span className="invalid-val">* {errors.message}</span>
              ) : null}
            </div>

            <div className="form-floating ">
              <button type="submit" className=" w-100 py-2 btn btn-primary fs-3">
                send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HelpDesk;
