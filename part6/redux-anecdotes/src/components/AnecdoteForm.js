import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    const anecdote = await anecdoteService.postNew(content);
    dispatch(addAnecdote(anecdote));

    event.target.anecdote.value = "";
    dispatch(changeNotification("Added a new anecdote!"));
    setTimeout(() => {
      dispatch(changeNotification(""));
    }, 5000);
  };

  return (
    <form onSubmit={createAnecdote}>
      <h2>Create new anecdote</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
