import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../componenets/Input";

import { signinValidation } from "../../services/validation";
import { getUser, loginApi } from "../../helper/apiHelper";

import "../../style/signin.css";

import getCookie from "../../helper/getCookie";

const Signin = () => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const token = getCookie("token");


  const initialValues = {
    loginId: "",
    password: "",
  };

  const handleOnSubmit = async (values, resetForm) => {
    const response = await loginApi(
      "/api/login",
      {
        loginId: values.loginId,
        password: values.password,
      },
      { "Content-Type": "application/json" }
    );
    cookies.set("token", response.token, { path: "/" });

    dispatch({ type: "LOGIN", payload: true });
    resetForm();
    // <Navigate to="/dashboard" />
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues,

    validationSchema: signinValidation,

    onSubmit: (values, { resetForm }) => {
      handleOnSubmit(values, resetForm);
    },
  });

  useEffect(() => {
    if (userReducer.loggedInUser) {
      navigate('/dashboard');
    }
  }, [userReducer.loggedInUser])
  

  useEffect(() => {
    if (token) {
      getUser().then((res) => {
        dispatch({ type: "ADD_ROLE", payload: res.role });
        dispatch({
          type: "ADD_USER",
          payload: res,
        });
        dispatch({ type: "LOGIN", payload: true });
        navigate('/dashboard')
      });
    }
  }, [])

  return (
    <div className="signin-container d-flex justify-content-evenly align-items-center">
      <div className="img-container">
        <img src="./images/E-Learning-BG.png" />
      </div>
      <div className="form-container w-25 text-left my-3 py-3 bg-light">
        <span className="d-block text-center fs-3 fw-bold">Login</span>
        <form className="form-floating my-5 px-5" onSubmit={handleSubmit}>
          <div className="my-4">
            <div className="form-floating">
              <Input
                type="text"
                name="loginId"
                id="loginId"
                htmlLabelName="Login Id"
                htmlLabelFor="loginId"
                placeholder="Login Id"
                values={values}
                handleChange={handleChange}
              />
            </div>
            {touched.loginId && errors.loginId ? (
              <span className="invalid-val">* {errors.loginId}</span>
            ) : null}
          </div>

          <div className="my-4">
            <div className="form-floating">
              <Input
                type="password"
                name="password"
                id="password"
                htmlLabelName="Password"
                htmlLabelFor="password"
                placeholder="Password"
                values={values}
                handleChange={handleChange}
              />
            </div>

            {touched.password && errors.password ? (
              <span className="invalid-val">* {errors.password}</span>
            ) : null}
          </div>

          <div className="form-check my-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="form2Example3"
            />
            <label className="form-check-label" htmlFor="form2Example3">
              Remember me
            </label>
          </div>

          <div className="form-floating">
            <button type="submit" className=" w-100 py-2 btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <Link to="/forgot-password" className="fpassword text-body px-5">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Signin;
