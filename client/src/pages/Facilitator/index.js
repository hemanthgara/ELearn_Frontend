import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { toast } from "react-toastify";

import Input from "../../componenets/Input";

import { facilitatorSignupValidation } from "../../services/validation";
import { postApi } from "../../helper/apiHelper";

import "../../style/facilitator.css";


const Facilitator = () => {
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    loginId: "",
    email: "",
    password: "",
    cpassword: "",
    contact: "",
    gender: "",
  };

  const handleOnSubmit = async (values, resetForm) => {
    const response = await postApi(
      "/api/register",
      {
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        role: "faculty",
        loginId: values.loginId,
        contact: values.contact,
        gender: values.gender,
      },
      { "Content-Type": "application/json" }
    );
    
    if (response.status === 201) {
      resetForm();
      toast.success("Registered successfully!!!");
      navigate("/signin");
    }
  
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues,

    validationSchema: facilitatorSignupValidation,

    onSubmit: (values, { resetForm }) => {
      handleOnSubmit(values, resetForm);
    },
  });

  return (
    <div className="facilitator-container d-flex justify-content-center align-items-center">
      <div className="w-50 text-left my-3 py-3 bg-light">
        <span className="d-block text-center fs-3 fw-bold pt-3">
          Facilitator Registration
        </span>

        <form className="form-floating my-5 px-5" onSubmit={handleSubmit}>
          <div className="my-4">
            <div className="form-floating">
              <Input
                type="text"
                name="first_name"
                id="first_name"
                htmlLabelFor="first_name"
                htmlLabelName="First Name"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.first_name && errors.first_name ? (
              <span className="invalid-val">* {errors.first_name}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="text"
                name="last_name"
                id="last_name"
                htmlLabelFor="last_name"
                htmlLabelName="Last Name"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.last_name && errors.last_name ? (
              <span className="invalid-val">* {errors.last_name}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="text"
                name="loginId"
                id="loginId"
                htmlLabelFor="loginId"
                htmlLabelName="Login Id"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.loginId && errors.loginId ? (
              <span className="invalid-val">* {errors.loginId}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="email"
                name="email"
                id="email"
                htmlLabelFor="email"
                htmlLabelName="Email"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.email && errors.email ? (
              <span className="invalid-val">* {errors.email}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="password"
                name="password"
                id="password"
                htmlLabelFor="password"
                htmlLabelName="Password"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.password && errors.password ? (
              <span className="invalid-val">* {errors.password}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="password"
                name="cpassword"
                id="cpassword"
                htmlLabelFor="cpassword"
                htmlLabelName="Confirm Password"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.cpassword && errors.cpassword ? (
              <span className="invalid-val">* {errors.cpassword}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="text"
                name="contact"
                id="contact"
                htmlLabelFor="contact"
                htmlLabelName="Contact"
                values={values}
                handleChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {touched.contact && errors.contact ? (
              <div className="invalid-val">* {errors.contact}</div>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <select
                className="form-select fs-5"
                name="gender"
                id="gender"
                value={values.gender}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value={""} defaultValue="no-value" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="floatingSelect">Gender</label>
            </div>
            {touched.gender && errors.gender ? (
              <div className="invalid-val">* {errors.gender}</div>
            ) : null}
          </div>

          <div className="form-floating">
            <button type="submit" className=" w-100 py-2 btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <div className="px-5">
          <span>Aleady a user?</span>{" "}
          <Link className="text-primary fw-bold" to="/signin">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Facilitator;
