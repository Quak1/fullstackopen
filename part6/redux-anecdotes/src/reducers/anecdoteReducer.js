import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export default anecdoteSlice.reducer;
export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
