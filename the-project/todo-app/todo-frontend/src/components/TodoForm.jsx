import { useState } from 'react';

const TodoForm = ({ createTodo }) => {
  const [title, setTitle] = useState('');
  const handleTitleChange = ({ target }) => setTitle(target.value);
  const addTodo = (event) => {
    event.preventDefault();
    createTodo({
      title: title,
      done: false,
    });
    setTitle('');
  };
  return (
    <form onSubmit={addTodo}>
      <input value={title} onChange={handleTitleChange}></input>
      <button type="submit">Create todo</button>
    </form>
  );
};

export default TodoForm;
