const Todo = ({ todo, mark }) => {
  const markAsDone = (event) => {
    event.preventDefault();
    mark(todo.id);
  };
  return (
    <li>
      {todo.title}
      <button onClick={() => markAsDone}>Mark as done</button>
    </li>
  );
};

export default Todo;
