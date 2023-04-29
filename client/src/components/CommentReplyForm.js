import React from 'react'
import { useFormik } from 'formik'

import {postApi} from "../helper/apiHelper"
import { useDispatch } from 'react-redux'
import { ADD_REPLIES } from '../redux/types/comment'
import { toast } from 'react-toastify'

const CommentReplyForm = ({ comment, setReplyCommentId }) => {
    const dispatch = useDispatch();


    const handleOnSubmit = async(values, resetForm) => {
        const response = await postApi("/api/replies", {...values}, {"Content-Type" : "application/json"});
        if(response.status === 201){
            dispatch({type: ADD_REPLIES, payload: response.data.data})
            toast.success('Reply added!!!')
            resetForm();
            setReplyCommentId([]);
        }
    }

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            comment_id: comment._id,
            message: "",
            video_id: comment.video_id
        },

        onSubmit: (values, { resetForm }) => {
            handleOnSubmit(values, resetForm)
        }
    })


    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <div className="w-75 mx-2">
                    <input type="text" className=" d-none" name={"comment_id"} value={values.comment_id} disabled />
                </div>

                <div className="w-75 mx-2">
                    <input type="text" className=" d-none" name={"video_id"} value={values.video_id} disabled />
                </div>

                <div className="form-floating">
                    <textarea className="form-control m-auto w-50" name={"message"} placeholder="Leave a comment here" cols={25} value={values.message} onChange={handleChange} style={{ minHeight: '5rem', maxHeight: '5rem' }}></textarea>
                    <label className="w-50 text-center" htmlFor="floatingTextarea" style={{ marginLeft: '80px' }} >reply</label>
                </div>
                <div className=" m-auto w-50 text-end py-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default CommentReplyForm