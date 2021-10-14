import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Todo from '../components/Todo';
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
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  // edit item to
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <Container>
      <TodoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />
      {todos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          taco={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
        // props are arguments - key, taco, setTodos
        // setTodos sets todos
      ))}
    </Container>
  );
}

export default Initialize;
