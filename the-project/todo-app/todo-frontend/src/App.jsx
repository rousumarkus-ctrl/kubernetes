import { useState } from 'react';
import TodoForm from './components/TodoForm';
import todoService from './services/todos';
import { useEffect } from 'react';
import Todo from './components/Todo';
import axios from 'axios';
import Done from './components/Done';

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
    console.log('added', returnedTodo);
    setTodos(todos.concat(returnedTodo));
  };

  const markAsDone = async (id) => {
    const returnedTodo = await todoService.mark(id);
    console.log('done', returnedTodo);
    setTodos(todos.filter((t) => t.id != id).concat(returnedTodo));
  };

  return (
    <>
      <h1>The Project App</h1>
      <img src="/image" style={{ width: '400px', height: '400px' }}></img>
      <TodoForm createTodo={createTodo}></TodoForm>
      <h2>Todo</h2>
      <ul>
        {todos
          .filter((t) => !t.done)
          .map((todo) => (
            <Todo key={todo.title} todo={todo} mark={markAsDone}></Todo>
          ))}
      </ul>
      <h2>Done</h2>
      <ul>
        {todos
          .filter((t) => t.done)
          .map((todo) => (
            <Done key={todo.title} todo={todo} mark={markAsDone}></Done>
          ))}
      </ul>
      <p>
        <a href="https://courses.mooc.fi/org/uh-cs/courses/devops-with-kubernetes">
          DevOps with Kubernetes 2025
        </a>
        University of Helsinki
      </p>
    </>
  );
}

export default App;
