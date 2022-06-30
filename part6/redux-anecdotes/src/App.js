import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import NewAnecdote from "./components/NewAnecdote";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  const anecdotesByVotes = [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <NewAnecdote />
    </div>
  );
};

export default App;

