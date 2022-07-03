import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    props.createAnecdote(content);

    event.target.anecdote.value = "";
    props.setNotification("Added a new anecdote!", 10);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new anecdote</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);
