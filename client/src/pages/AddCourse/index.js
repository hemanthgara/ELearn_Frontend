import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../../componenets/Input";

// redux 
import { useDispatch, useSelector } from "react-redux";
import { ADD_COURSE } from "../../redux/types/couserTypes";

import { addCourseValidation } from "../../services/validation";
import { postApi } from "../../helper/apiHelper";

import "../../style/addcourse.css";
import { toast } from "react-toastify";

const AddCourse = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.authReducer);
  const [fileValidation, setFileValidation] = useState(false);

  const initialValues = {
    coursename: "",
    coursedetail: "",
    aboutcourse: "",
    courselanguage: "",
    coursefile: "",
  };

  const { values, handleSubmit, handleChange, setFieldValue, touched, errors } =
    useFormik({
      initialValues,

      validationSchema: addCourseValidation,

      onSubmit: (values, { resetForm }) => {
        postApi("/api/cource", {
          name: values.coursename,
          description: values.coursedetail,
          about_cource: values.aboutcourse,
          language: values.courselanguage,
          file: values.coursefile,
        }).then((res) => {
          if(res.status === 201){

            dispatch({ type: ADD_COURSE, payload: res.data.data });
            toast.success("Course added !!!")
            document.getElementById("coursefile").value = "";
            resetForm();
          }
        });
      },
    });

  if (role === "faculty" || role === "admin") {
    
    return (
      <>
        <div
          className="addcourse-container d-flex justify-content-center align-items-center"
          
        >
          <div className="form-section mt-3 w-50 text-left my-3 py-3 bg-light">
            <div className="row">
              <div className="my-12">

                <span className="d-block text-center fs-3 fw-bold pt-3">
                  Add your course
                </span>

                <form
                  className="form-floating my-5 px-5"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="my-4">
                    <div className="form-floating">
                      <Input
                        type="text"
                        name="coursename"
                        id="coursename"
                        htmlLabelName="Course Name"
                        htmlLabelFor="coursename"
                        values={values}
                        handleChange={handleChange}
                        placeholder="Course Name"
                      />
                    </div>

                    {touched.coursename && errors.coursename ? (
                      <span className="invalid-val">* {errors.coursename}</span>
                    ) : null}
                  </div>

                  <div className="my-4">
                    <div className="form-floating">
                      <Input
                        type="text"
                        name="aboutcourse"
                        id="aboutcourse"
                        htmlLabelName="About Course"
                        htmlLabelFor="aboutcourse"
                        values={values}
                        handleChange={handleChange}
                        placeholder="About Course"
                      />
                    </div>

                    {touched.aboutcourse && errors.aboutcourse ? (
                      <span className="invalid-val">
                        * {errors.aboutcourse}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <div className="form-floating">
                      <textarea
                        name="coursedetail"
                        className="form-control"
                        onChange={handleChange}
                        value={values.coursedetail}
                        cols="7"
                        rows={"4"}
                        placeholder="Description"
                        style={{ minHeight: "8rem", maxHeight: "8rem" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">Description</label>
                    </div>

                    {touched.coursedetail && errors.coursedetail ? (
                      <span className="invalid-val">
                        * {errors.coursedetail}
                      </span>
                    ) : null}
                  </div>

                  <div className="my-4">
                    <div className="form-floating">
                      <Input
                        type="text"
                        name="courselanguage"
                        id="courselanguage"
                        htmlLabelName="Language"
                        htmlLabelFor="courselanguage"
                        values={values}
                        handleChange={handleChange}
                        placeholder="Language"
                      />
                    </div>
                    {touched.courselanguage && errors.courselanguage ? (
                      <span className="invalid-val">
                        * {errors.courselanguage}
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <div>
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        name="coursefile"
                        id="coursefile"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.files.length === 1) {
                            if (
                              e.target.files[0].name.match(
                                /\.(jpg|jpeg|png|gif)$/
                              )
                            ) {
                              setFieldValue(
                                "coursefile",
                                e.currentTarget.files[0]
                              );
                              setFileValidation(false);
                              errors.coursefile = undefined;
                              return;
                            }

                            e.target.value = "";
                            setFileValidation(true);
                            errors.coursefile =
                              "Please select a valid image jpg | jpeg| png | gif ";
                            return;
                          }

                          e.target.value = "";
                          errors.coursefile = "Select only one image at a time";
                        }}
                      />
                    </div>

                    {(touched.coursefile || fileValidation) &&
                    errors.coursefile ? (
                      <span className="invalid-val">* {errors.coursefile}</span>
                    ) : null}
                  </div>

                  {/* <div className="mb-3">
                        <label className="form-label">Video</label>
                        <input
                          type="file"
                          name="coursefile"
                          id="coursefile"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) =>
                            setFieldValue("coursefile", e.currentTarget.files[0])
                          }
                        />
                      </div>
    
                      <div className="mb-3">
                        <label className="form-label">pdf</label>
                        <input
                          type="file"
                          name="coursefile"
                          id="coursefile"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) =>
                            setFieldValue("coursefile", e.currentTarget.files[0])
                          }
                        />
                      </div> */}
                  <button type="submit" className="btn btn-primary">
                    Add Course
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }else{
    return <></>
  }


};

export default AddCourse;
