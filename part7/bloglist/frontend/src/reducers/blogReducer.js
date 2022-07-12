import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const counterSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs: (state, action) => {
      const blogs = action.payload.reduce(
        (obj, item) => ((obj[item.id] = item), obj),
        {}
      );
      return blogs;
    },
    addBlog: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    updateBlog: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    deleteBlog: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  } catch (exception) {
    console.log("creteBlog exception", exception);
  }
};

export const { setBlogs, addBlog, updateBlog, deleteBlog } =
  counterSlice.actions;

export default counterSlice.reducer;
