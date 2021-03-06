import React, { useEffect, useState } from 'react';
import { getCompletedTodos } from '../api/data/todoData';
import CompletedTodos from '../components/CompletedTodos';

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getCompletedTodos().then(setCompletedTodos);
  }, []);
  return (
    <div>
      {completedTodos.map((completedTodo) => (
        <CompletedTodos
          completedTodo={completedTodo}
          setCompletedTodos={setCompletedTodos}
        />
      ))}
    </div>
  );
}
