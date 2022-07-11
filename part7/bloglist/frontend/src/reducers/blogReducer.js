import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const counterSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.concat(action.payload);
      state.value += action.payload;
    },
    likeBlog: (state, action) => {
      const id = action.payload.id;
      const blogToLike = state.find((b) => b.id === id);
      blogToLike.likes += 1;
    },
  },
});

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const { setBlogs, addBlog, likeBlog } = counterSlice.actions;

export default counterSlice.reducer;
