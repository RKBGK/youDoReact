import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTodo } from '../api/data/todoData';

// Create an initial state object so that it can be reused in the component
const initialState = {
  name: '',
  complete: false,
  uid: '',
};
export default function TodoForm({ obj, setTodos }) {
  // set the default state to the initialState object
  const [formInput, setFormInput] = useState(initialState);

  // when the component mounts, check if a firebasekey exists. If it does, set the value of formInput to the obj values
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
    // rerender the component if the obj value is different
  }, [obj]);

  // On call of the resetForm function, reset the state to the initialState
  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Since we are using this form for both creating and updating, we need to use logic to determine which method to run. If there is a firebaseKey, we know that we are updating.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // update the todo
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <label htmlFor="name" className="form-label visually-hidden">
            Name
            <input
              className="form-control form-control-lg me-3"
              type="text"
              id="name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              placeholder="Enter A You Do!"
              required
            />
          </label>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
  setTodos: PropTypes.func.isRequired,
};

TodoForm.defaultProps = {
  obj: {},
};
