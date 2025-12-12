import { useState } from 'react';
import TodoForm from './components/TodoForm';
import todoService from './services/todos';
import { useEffect } from 'react';
import Todo from './components/Todo';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAll().then((todos) => {
      setTodos(todos);
    });
    axios.post('/image');
  }, []);

  const createTodo = async (todoObject) => {
    const returnedTodo = await todoService.create(todoObject);
    console.log(returnedTodo);
    setTodos(todos.concat(returnedTodo));
  };

  return (
    <>
      <h1>The Project App</h1>
      <img src="/image" style={{ width: '400px', height: '400px' }}></img>
      <TodoForm createTodo={createTodo}></TodoForm>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.title} todo={todo}></Todo>
        ))}
      </ul>
      <p>DevOps with Kubernetes 2025</p>
    </>
  );
}

export default App;
