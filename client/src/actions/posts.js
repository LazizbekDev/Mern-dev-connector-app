import axios from "axios";
import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POSTS,
    GET_POST,
    GET_POSTS,
    POSTS_ERR,
    REMOVE_COMMENT,
    UPDATE_LIKES
} from "./types";
import {setAlert} from "./alert";

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POSTS,
            payload: id
        })
        dispatch(setAlert('Post removed', 'success'))
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/posts/', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post created', 'success'))
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment added', 'success'))
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Post removed', 'success'))
    } catch (e) {
        dispatch({
            type: POSTS_ERR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        })
    }
}
