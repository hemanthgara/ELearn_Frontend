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

  


    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <div className="w-75 mx-2">
                    <input type="text" className=" d-none" name={"comment_id"} value={values.comment_id} disabled />
                </div>

                
            </div>
        </form>
    )
}

export default CommentReplyForm