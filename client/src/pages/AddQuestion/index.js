import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import { postApi } from "../../helper/apiHelper";
import { QuestionValidation } from "../../services/validation";

import "../../style/addQuestion.css";
import { toast } from "react-toastify";


const AddQuestion = () => {
    const { id } = useParams();

    const questionSubmit = async (values, resetForm) => {

        const response = await postApi("/api/questions", {
            video_id: values.video_id,
            question: values.question,
            option1: values.option1,
            option2: values.option2,
            option3: values.option3,
            option4: values.option4,
            currectAnswer: values.correctOption

        }, { 'Content-Type': 'application/json' });
        if (response.status === 201) {
            toast.success("Question added!!!")
            resetForm();
        }
    }
    const { values, handleSubmit, handleChange, touched, errors } = useFormik({


        initialValues: {
            video_id: id,
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctOption: ""
        },

        validationSchema: QuestionValidation,

        onSubmit: async (values, { resetForm }) => {

            questionSubmit(values, resetForm)
        },
    });


    return (

        <>
            <div className="question-container d-flex justify-content-center align-items-center">
                <div className="form-section mt-3 w-50 text-left my-3 py-3 bg-light">
                    <span className="d-block text-center fs-3 fw-bold pt-3">
                        Add Question
                    </span>
                    <form className="form-floating my-5 px-5" onSubmit={handleSubmit} >

                        <div className="my-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="question"
                                    onChange={handleChange}
                                    value={values.question}
                                    className="form-control"
                                    placeholder="Question" />
                                <label>Question</label>
                            </div>

                            {touched.question && errors.question ? (
                                <span className="invalid-val">* {errors.question}</span>
                            ) : null}
                        </div>

                        <div className="my-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="option1"
                                    id="option-1"
                                    onChange={handleChange}
                                    value={values.option1}
                                    className="form-control"
                                    placeholder="Option 1" />
                                <label htmlFor="option-1">Option 1</label>
                            </div>

                            {touched.option1 && errors.option1 ? (
                                <span className="invalid-val">* {errors.option1}</span>
                            ) : null}
                        </div>

                        <div className="my-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="option2"
                                    id="option-2"
                                    onChange={handleChange}
                                    value={values.option2}
                                    className="form-control"
                                    placeholder="Option 2" />
                                <label htmlFor="option-2">Option 2</label>
                            </div>

                            {touched.option2 && errors.option2 ? (
                                <span className="invalid-val">* {errors.option2}</span>
                            ) : null}
                        </div>


                        <div className="my-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="option3"
                                    id="option-3"
                                    onChange={handleChange}
                                    value={values.option3}
                                    className="form-control"
                                    placeholder="Option 3" />
                                <label htmlFor="option-3">Option 3</label>
                            </div>

                            {touched.option3 && errors.option3 ? (
                                <span className="invalid-val">* {errors.option3}</span>
                            ) : null}
                        </div>


                        <div className="my-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    name="option4"
                                    id="option-4"
                                    onChange={handleChange}
                                    value={values.option4}
                                    className="form-control"
                                    placeholder="Option 4" />
                                <label htmlFor="option-4">Option 4</label>
                            </div>

                            {touched.option4 && errors.option4 ? (
                                <span className="invalid-val">* {errors.option4}</span>
                            ) : null}
                        </div>

                        <div className="my-4">
                            <div className="form-floating">
                                <select
                                    className="form-select fs-5"
                                    name="correctOption"
                                    id="correctOption"
                                    value={values.correctOption}
                                    onChange={handleChange}
                                    aria-label="Default select example"
                                >
                                    <option value={""} defaultValue="no-value" >
                                        Select
                                    </option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option4">Option 4</option>
                                </select>
                                <label htmlFor="floatingSelect">Correct Option</label>
                            </div>
                            {touched.correctOption && errors.correctOption ? (
                                <div className="invalid-val">* {errors.correctOption}</div>
                            ) : null}
                        </div>

                        <div className="w-25 mt-4">
                            <button type="submit" className="btn btn-primary">ADD</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
};
export default AddQuestion
