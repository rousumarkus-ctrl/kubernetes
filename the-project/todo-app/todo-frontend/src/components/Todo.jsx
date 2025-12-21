const Todo = ({ todo, mark }) => {
  return (
    <li>
      {todo.title}
      <button onClick={() => mark(todo.id)}>Mark as done</button>
    </li>
  );
};

export default Todo;
