import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = ({ changeFilter }) => {
  const handleChange = (event) => {
    changeFilter(event.target.value);
  };

  const style = {
    marginTop: 10,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { changeFilter })(Filter);
