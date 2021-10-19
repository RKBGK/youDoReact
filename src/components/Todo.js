import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteTodo, updateTodo } from '../api/data/todoData';

const TodoStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  h5 {
    flex-grow: 2;
    margin-left: 20px;
  }

  button {
    color: white;

    &:first-child {
      margin-right: 10px;
    }
  }
`;

// NOTES: We want to update this component so that if the todo is complete, the button changes and the edit button is no longer present.
export default function Todo({ taco, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(taco.firebaseKey).then(setTodos);
    } else {
      // update complete value on todo
      updateTodo({ ...taco, complete: true }).then(setTodos);
    }
  };

  return (
    <TodoStyle
      className="d-flex justify-content-between alert alert-light"
      role="alert"
    >
      {taco.complete ? (
        <button className="btn btn-success" type="button" disabled>
          <i className="fas fa-check-circle fa-2x" />
        </button>
      ) : (
        <button
          onClick={() => handleClick('complete')}
          className="btn btn-success"
          type="button"
        >
          <i className="fas fa-circle fa-2x" />
        </button>
      )}
      <h5>{taco.name}</h5>
      <div>
        {!taco.complete && (
          <button
            onClick={() => setEditItem(taco)}
            className="btn btn-info"
            type="button"
          >
            EDIT
          </button>
        )}
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </div>
    </TodoStyle>
  );
}

Todo.propTypes = {
  taco: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
