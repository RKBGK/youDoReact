import React from 'react';
import PropTypes from 'prop-types';
import { deleteAllTodo } from '../api/data/todoData';

export default function AllTodos({ allTodo, setAllTodos }) {
  const handleClick = () => {
    deleteAllTodo(allTodo.firebaseKey).then(setAllTodos);
  };

  return (
    <>
      <div
        className="d-flex justify-content-between alert alert-light"
        role="alert"
      >
        {allTodo.name}
        <button onClick={handleClick} className="btn btn-danger" type="button">
          DELETE
        </button>
      </div>
    </>
  );
}

AllTodos.propTypes = {
  allTodo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setAllTodos: PropTypes.func.isRequired,
};
