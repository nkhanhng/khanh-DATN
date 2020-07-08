import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST,
    GET_POST,
    CLEAR_ERRORS
} from './type';

export const addPost = postData => dispatch => {
    dispatch(clearErrors())
    axios.post('/api/posts', postData)
         .then(res => dispatch({
             type: ADD_POST,
             payload: res.data
         }))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}

//Get posts
export const getPosts = (page = 1) => dispatch => {
    dispatch(setPostLoading())
    axios.get(`/api/posts/${page}`)
         .then(res => dispatch({
             type: GET_POSTS,
             payload: { posts: res.data.posts, numPage: res.data.numPage}
         }))
         .catch(err => dispatch({
             type: GET_POSTS,
             payload: null
         }))
}

//Delete post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
         .then(res => dispatch({
             type: DELETE_POST,
             payload: id
         }))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}

//Add like 
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
         .then(res => dispatch(getPosts()))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}

//Unlike 
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
         .then(res => dispatch(getPosts()))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}

//Get post
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading())
    axios.get(`/api/posts/${id}`)
         .then(res => dispatch({
             type: GET_POST,
             payload: res.data
         }))
         .catch(err => dispatch({
             type: GET_POST,
             payload: null
         }))
}

//add comment
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors())
    axios.post(`/api/posts/comment/${postId}`, commentData)
         .then(res => dispatch({
             type: GET_POST,
             payload: res.data
         }))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}

//delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
         .then(res => dispatch({
             type: GET_POST,
             payload: res.data
         }))
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))
}
//set loading
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}