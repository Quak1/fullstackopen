import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));

    event.target.anecdote.value = "";
    dispatch(changeNotification("Added a new anecdote!"));
    setTimeout(() => {
      dispatch(changeNotification(""));
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new anecdote</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
