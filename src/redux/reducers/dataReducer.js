import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  SET_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  paintings: [],
  painting: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POST:
      return {
        ...state,
        paintings: action.payload,
        loading: false
      };
    case SET_POST:
      return {
        ...state,
        painting: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post.likeCount = action.payload.likeCount;
      }
      return {
        ...state
      };
    case DELETE_POST:
      let indexx = state.posts.findIndex(
        post => post.postId === action.payload
      );
      state.posts.splice(indexx, 1);
      return {
        ...state
      };
    case POST_POST:
      return {
        ...state,
        paintings: [action.payload, ...state.post]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    default:
      return state;
  }
}
