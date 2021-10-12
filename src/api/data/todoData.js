import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getTodos = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/todo.json?orderBy="complete"&equalTo=false`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTodo = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/todo.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/todo/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getTodos().then(resolve));
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/todo/${firebaseKey}.json`)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

const updateTodo = (todoObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/todo/${todoObj.firebaseKey}.json`, todoObj)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

export {
  getTodos, createTodo, deleteTodo, updateTodo,
};
