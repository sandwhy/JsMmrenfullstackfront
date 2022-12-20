import { DELETE, UPDATE, FETCH_BY_SEARCH, FETCH_ALL, CREATE, FETCH_POST, START_LOADING, END_LOADING, COMMENT } from "../constants/actiontypes"
import * as api from "../api"

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log("doing dispatch")
        const {data} = await api.fetchPosts(page)
        console.log(data)

        dispatch({type:FETCH_ALL, payload:data})
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(`from get posts | ${error}`)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        console.log("stars with")
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)

        console.log("ove to here")
        console.log(data)

        dispatch({ type: FETCH_POST, payload: { post: data }})
        console.log("ends with")
        dispatch({ type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) =>{
    try {
        const { data } = await api.comment(value,id)

        dispatch({ type:COMMENT, payload: data })

        return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(searchQuery)
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery)

        // console.log("getopst data")
        // console.log(data)
    
        dispatch({ type: FETCH_BY_SEARCH, payload:data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    console.log("creating post")
    try {
        const {data} = await api.createPost(post)
        // console.log("data")
        // console.log(data)
        dispatch({type:CREATE, payload: data})
    } catch (error) {
        console.log(`${error.message} | from action createpost`)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    console.log("doing update")
    try {
        const {data} = await api.updatePost(id, post)

        dispatch({type:UPDATE, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    // console.log("doing deleting")
    try {
        console.log(id)
        await api.deletePost(id)

        dispatch({type:DELETE, payload: id})
    } catch (error) {
        console.log(error )
    }
}

export const likePost = (id) => async(dispatch) => {
    console.log("likePost")
    try {
        const {data} = await api.likePost(id)
        console.log(data)
        dispatch({type:UPDATE, payload:data})
    } catch (error) {
        console.log(error)
    }
}

