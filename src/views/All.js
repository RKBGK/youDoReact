import React, { useEffect, useState } from 'react';
import { getAllTodos } from '../api/data/todoData';
import AllTodos from '../components/AllTodos';

export default function All() {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then(setAllTodos);
  }, []);
  return (
    <div>
      {allTodos.map((allTodo) => (
        <AllTodos allTodo={allTodo} setAllTodos={setAllTodos} />
      ))}
    </div>
  );
}
