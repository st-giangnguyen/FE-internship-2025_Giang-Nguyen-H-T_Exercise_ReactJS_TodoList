import { useState, KeyboardEvent } from 'react';
interface Todo {
  text: string;
  completed: boolean;
} // Ở đây định nghĩa kiểu dl cho todo 

function App() {
  //Khai báo các state của input dạng string và todo dạng array
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])


  // Xử lý sự kiện nhấn enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newTodo: Todo = { text: inputValue.trim(), completed: false };
      setTodos([...todos, newTodo]); // nếu khi thêm todo thì state thay đổi -> re-render
      setInputValue('');
    }
  };

  // Tạo hàm toggle
  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed; //đổi trạng thái
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (i !== index) {
        updatedTodos.push(todos[i]);
      }
    }
      setTodos(updatedTodos);
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
