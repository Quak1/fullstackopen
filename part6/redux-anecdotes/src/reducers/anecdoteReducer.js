import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id !== id) return anecdote;
        return {
          ...anecdote,
          votes: anecdote.votes + 1,
        };
      });
    },
    addAnecdote(state, action) {
      const newAnecdote = action.payload;
      return state.concat(newAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      const index = state.findIndex((a) => a.id === id);
      state[index] = action.payload;
    },
  },
});

export const fetchAnecdotes = () => async (dispatch, getState) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch, getState) => {
  const anecdote = await anecdoteService.postNew(content);
  dispatch(addAnecdote(anecdote));
};

export const voteFor = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find((a) => a.id === id);
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const updatedAnecdote = await anecdoteService.update(votedAnecdote);
  dispatch(updateAnecdote(updatedAnecdote));
};

export default anecdoteSlice.reducer;
export const { voteAnecdote, addAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions;
