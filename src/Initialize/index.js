import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
// import Todo from '../components/Todo';
import CategorizedTodos from '../components/CategorizedTodos';
import TodoForm from '../components/TodoForm';

const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 50px 0;

  h1 {
    color: white;
    text-align: center;
    font-size: 64px;
    font-weight: 400;
  }

  h3 {
    color: lightgrey;
    text-align: center;
  }
  h4 {
    color: lightgrey;
    text-transform: uppercase;
    font-size: medium;
  }
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  // edit item to
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos().then((todoArray) => {
      setTodos(todoArray);
    });
  }, []);

  return (
    <Container>
      <TodoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />
      <div className="mt-5">
        {todos.length ? (
          <CategorizedTodos
            todos={todos}
            setTodos={setTodos}
            setEditItem={setEditItem}
          />
        ) : (
          <h3>Add A YOU DO!</h3>
        )}
      </div>
      {/* //{todos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          taco={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
        // props are arguments - key, taco, setTodos
        // setTodos sets todos
      ))} */}
    </Container>
  );
}

export default Initialize;
