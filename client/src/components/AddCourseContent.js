import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import "../style/AddCourseContent.css";
import { courseContentValidation } from "../services/validation";
import Input from "./Input";
import { postApi } from "../helper/apiHelper";
import { useDispatch } from "react-redux";
import { ADD_CONTENT } from "../redux/types/couserTypes";

const AddCourseContent = ({ _id, language }) => {

  const dispatch = useDispatch();
  const [fileValidation, setFileValidation] = useState(false);
  const submitRef = useRef(null);
  const closeRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const pdfRef = useRef(null);

  const initialValues = {
    courseId: _id,
    title: "",
    description: "",
    image: "",
    video: "",
    pdf: "",
  };

  const handleSubmitForm = (values, resetForm) => {
    console.log(values, 'avaou8es')
    postApi("/api/cource/video", {
      cource_id: values.courseId,
      title: values.title,
      description: values.description,
      image: values.image,
      gallery: values.video,
      document: values.pdf,
    }).then((res) => {
      console.log(res, 'res')
      if(res.status === 201){
        dispatch({ type: ADD_CONTENT, payload: res.data.data });
        toast.success("Content added!!!")
        resetForm();
      }
    });
  };

  let {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues,

    validationSchema: courseContentValidation,

    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values, resetForm);
    },
  });

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      pdfRef.current.value = "";
      imageRef.current.value = "";
      videoRef.current.value = "";
    }
  }, [isSubmitting]);

  return (
    <div className="addCourseContent-container">
      <FaPlus
        type="button"
        className="text-primary fs-5"
        data-bs-toggle="modal"
        data-bs-target={`#modal-${_id}`}
        role="button"
      />

      <div
        className="modal fade"
        id={`modal-${_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-header">
                <h1
                  className="modal-title fs-4 fw-bold border-bottom"
                  id="exampleModalLabel"
                >
                  Add {language} Content
                </h1>

                <div className="form-container">
                  <div className="form-section text-left bg-light">
                    <div className="row">
                      <div className="">
                        <form
                          className="form-floating "
                          onSubmit={handleSubmit}
                          encType="multipart/form-data"
                        >
                          <div className="my-4 d-none">
                            <div className="form-floating">
                              <Input
                                type="text"
                                name="courseId"
                                id="courseId"
                                htmlLabelName="Course Id"
                                htmlLabelFor="courseId"
                                values={values}
                                disable={true}
                                handleChange={handleChange}
                                placeholder="Course Id"
                              />
                            </div>

                            {touched.courseId && errors.courseId ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.courseId}
                              </span>
                            ) : null}
                          </div>

                          <div className="my-4">
                            <div className="form-floating">
                              <Input
                                type="text"
                                name="title"
                                id="title"
                                htmlLabelName="Title"
                                htmlLabelFor="title"
                                values={values}
                                handleChange={handleChange}
                                placeholder="Title"
                              />
                            </div>

                            {touched.title && errors.title ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.title}
                              </span>
                            ) : null}
                          </div>

                          <div>
                            <div className="form-floating">
                              <textarea
                                name="description"
                                className="form-control"
                                onChange={handleChange}
                                value={values.description}
                                cols="7"
                                rows={"4"}
                                placeholder="Description"
                                style={{ minHeight: "8rem", maxHeight: "8rem" }}
                              ></textarea>
                              <label htmlFor="floatingTextarea2">
                                Description
                              </label>
                            </div>

                            {touched.description && errors.description ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.description}
                              </span>
                            ) : null}
                          </div>

                          <div className="my-4">
                            <div>
                              <label className="form-label d-block pb-1 text-start">Image</label>
                              <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                className="form-control"
                                ref={imageRef}
                                onChange={(e) => {
                
                                  if (e.target.files.length === 1) {
                                    if (
                                      e.target.files[0].name.match(
                                        /\.(jpg|jpeg|png|gif)$/
                                      )
                                    ) {
                                      setFieldValue(
                                        "image",
                                        e.currentTarget.files[0]
                                      );
                                      setFileValidation(false);
                                      errors = {};
                                      return;
                                    }

                                    e.target.value = "";
                                    setFileValidation(true);
                                    errors.image =
                                      "Please select a valid image jpg|jpeg|png|gif ";
                                    return;
                                  }

                                  e.target.value = "";
                                  errors.image =
                                    "Select only one image at a time";
                                }}
                              />
                            </div>

                            {(touched.image || fileValidation) &&
                              errors.image ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.image}
                              </span>
                            ) : null}
                          </div>

                          <div className="mb-5">
                            <div>
                              <label className="form-label d-block pb-1 text-start">Video</label>
                              <input
                                type="file"
                                name="video"
                                id="video"
                                accept="image/*"
                                className="form-control"
                                ref={videoRef}
                                onChange={(e) => {
                                  if (e.target.files.length === 1) {
                                    if (
                                      e.target.files[0].name.match(/\.(mp4)$/)
                                    ) {
                                      setFieldValue(
                                        "video",
                                        e.currentTarget.files[0]
                                      );
                                      setFileValidation(false);
                                      errors = {};
                                      return;
                                    }

                                    e.target.value = "";
                                    setFileValidation(true);
                                    errors.video =
                                      "Please select a valid video mp4 ";
                                    return;
                                  }

                                  e.target.value = "";
                                  errors.video =
                                    "Select only one video at a time";
                                }}
                              />
                            </div>

                            {(touched.video || fileValidation) &&
                              errors.video ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.video}
                              </span>
                            ) : null}
                          </div>

                          <div className="">
                            <div>
                              <label className="form-label d-block pb-1 text-start">Pdf</label>
                              <input
                                type="file"
                                name="pdf"
                                id="pdf"
                                accept="image/*"
                                className="form-control"
                                ref={pdfRef}
                                onChange={(e) => {
                                  if (e.target.files.length === 1) {
                                    if (
                                      e.target.files[0].name.match(/\.(pdf)$/)
                                    ) {
                                      setFieldValue(
                                        "pdf",
                                        e.currentTarget.files[0]
                                      );
                                      setFileValidation(false);
                                      errors = {};
                                      return;
                                    }

                                    e.target.value = "";
                                    setFileValidation(true);
                                    errors.pdf =
                                      "Please select a valid pdf file ";
                                    return;
                                  }

                                  e.target.value = "";
                                  errors.video =
                                    "Select only one pdf file at a time";
                                }}
                              />
                            </div>

                            {(touched.pdf || fileValidation) && errors.pdf ? (
                              <span className="invalid-val d-block pb-1 text-start">
                                * {errors.pdf}
                              </span>
                            ) : null}
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary d-none"
                            ref={submitRef}
                          >
                            Add Content
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  submitRef.current.click();

                  if (
                    values.title !== "" &&
                    values.description !== "" &&
                    values.image !== "" &&
                    values.video !== "" &&
                    values.pdf !== ""
                  ) {
                    closeRef.current.click();
                  }
                }}
              >
                Add Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseContent;
