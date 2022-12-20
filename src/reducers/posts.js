import { FETCH_BY_SEARCH, FETCH_ALL, FETCH_POST, DELETE, CREATE, UPDATE, START_LOADING, END_LOADING, COMMENT } from "../constants/actiontypes"

export default (state= { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true}
        case END_LOADING:
            console.log("hellop")
            return { ...state, isLoading: false}
        case FETCH_ALL:
            console.log("here it is")
            // console.log(action.payload)
            return { 
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }         
            // return {
            //     ...state,
            //     posts: action.payload
            // }
        case FETCH_BY_SEARCH:
            return { 
                ...state,
                posts: action.payload
            }   
        case FETCH_POST:
            return { 
                ...state,
                post: action.payload.post
            }   
        case DELETE:
            return { ...state, posts: state.posts.filter((posts) => posts._id !== action.payload)}    
        case CREATE:
            return { ...state, posts: [ ...state, action.payload ]}    
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload: post)}                    
        case COMMENT:
            return { 
                ...state, 
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) return action.payload

                    return post
                })
            }
        default:
            return state
    }
}