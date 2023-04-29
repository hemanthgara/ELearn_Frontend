import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { axiosInstance } from "../helper/axiosInstance"

const GetUser = () => {

    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(state => state.userReducer)
    const [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        
            (async () => {
                const response = await axiosInstance.get("/api/me", {
                    withCredentials: true,
                });
                dispatch({ type: "ADD_ROLE", payload: response.data.data.role });
                dispatch({
                    type: "ADD_USER",
                    payload: response.data.data,
                });
                window.user = response.data.data
                dispatch({ type: "LOGIN", payload: true });
                setFetchingUser(false)

            })()

    }, []);

    return {
        loggedInUser,
        fetchingUser
    }
}

export default GetUser
