import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import Cookies from "universal-cookie";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../componenets/Input";

import { ForgetPasswordFormValidation } from "../../services/validation";
import { getUser, postApi } from "../../helper/apiHelper";

import "../../style/ForgetPassword.css";

import getCookie from "../../helper/getCookie";
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const { userReducer } = useSelector((state) => state);
    const navigate = useNavigate();
    // const cookies = new Cookies();
    const token = getCookie("token");
    const emailRef = useRef("");

    const [receiveOtp, setReceiveOtp] = useState(false);


    const getOtp = async () => {

        if (emailRef.current?.value) {
            const response = await postApi('/api/forgotPassword', { email: emailRef.current.value }, { "Content-Type": "application/json" });
            if (response.status === 200) {
                toast.success('We have sent otp on your mail !!!');
                setReceiveOtp(true)
            }
        } else {
            toast.error('Please enter email !!!')
            return
        }
    }


    const initialValues = {
        otp: "",
        new_password: "",
        confirm_password: ""
    };

    const handleOnSubmit = async (values, resetForm) => {
        const response = await postApi('/api/forgotPasswordVerify', {...values, token: values.otp}, {"Content-Type": "application/json"});
        if(response.data?.error){
            toast.error(response.data.message);
        }else{
            toast.success(response.data.message);
            navigate('/signin')
        }
        resetForm()
    };

    const { values, handleSubmit, handleChange, touched, errors } = useFormik({
        initialValues,

        validationSchema: ForgetPasswordFormValidation,

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
        <div className="forget-container d-flex justify-content-evenly align-items-center">
            <div className="img-container">
                <img src="./images/E-Learning-BG.png" />
            </div>


            <div className={`form-container w-25 text-left my-3 py-3 bg-light ${receiveOtp && 'd-none'}`}>

                <span className="d-block text-center fs-3 fw-bold">Forget-Password</span>

                <div className="form-floating my-5 px-5">
                    <div className="my-4">
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                ref={emailRef}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    <div className="form-floating">
                        <button type="button" className=" w-100 py-2 btn btn-primary" onClick={() => getOtp()} >
                            Next
                        </button>
                    </div>
                </div>

                <Link to="/signin" className="fpassword text-body px-5">
                    Signin?
                </Link>
            </div>


            <div className={`form-container w-25 text-left my-3 py-3 bg-light ${!receiveOtp && 'd-none'}`}>
                <span className="d-block text-center fs-3 fw-bold">Reset your password</span>
                <form className="form-floating my-5 px-5" onSubmit={handleSubmit}>
                    <div className="my-4">
                        <div className="form-floating">
                            <Input
                                type="text"
                                name="otp"
                                id="otp"
                                htmlLabelName="OTP"
                                htmlLabelFor="otp"
                                placeholder="OTP"
                                values={values}
                                handleChange={handleChange}
                            />
                        </div>
                        {touched.otp && errors.otp ? (
                            <span className="invalid-val">* {errors.otp}</span>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <div className="form-floating">
                            <Input
                                type="password"
                                name="new_password"
                                id="password"
                                htmlLabelName="Password"
                                htmlLabelFor="password"
                                placeholder="Password"
                                values={values}
                                handleChange={handleChange}
                            />
                        </div>

                        {touched.new_password && errors.new_password ? (
                            <span className="invalid-val">* {errors.new_password}</span>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <div className="form-floating">
                            <Input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                htmlLabelName="Confirm Password"
                                htmlLabelFor="confirm_password"
                                placeholder="Confirm Password"
                                values={values}
                                handleChange={handleChange}
                            />
                        </div>

                        {touched.confirm_password && errors.confirm_password ? (
                            <span className="invalid-val">* {errors.confirm_password}</span>
                        ) : null}
                    </div>

                    

                    <div className="form-floating">
                        <button type="submit" className=" w-100 py-2 btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>

                <button className="mx-5 btn btn-primary" onClick={() => setReceiveOtp(false)}>Back</button>
            </div>



        </div>
    );
};

export default ForgetPassword;