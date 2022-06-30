import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";
import { voteAnecdote, addAnecdote } from "./anecdoteReducer";

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [
  { content: "First anecdote", id: getId(), votes: 0 },
  { content: "Second anecdote", id: getId(), votes: 0 },
  { content: "Third anecdote", id: getId(), votes: 0 },
];

describe("unicafe reducer", () => {
  test("can vote an anecdote", () => {
    const id = initialState[1].id;
    const action = voteAnecdote(id);

    const state = initialState;
    deepFreeze(state);

    const newState = anecdoteReducer(state, action);
    expect(newState).toContainEqual({
      content: "Second anecdote",
      id,
      votes: 1,
    });
  });

  test("can create an anecdote", () => {
    const action = addAnecdote("New anecdote");

    const state = initialState;
    deepFreeze(state);

    const newState = anecdoteReducer(state, action);
    expect(newState).toHaveLength(4);
    expect(newState[3].content).toBe("New anecdote");
  });
});
