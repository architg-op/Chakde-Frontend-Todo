import { useState, React } from 'react';
import { MyContext } from './MyContext';
import TodoApp from './components/TodoApp';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: 'Do something nice for someone I care about',
      completed: true,
      userId: 26,
    },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [clickedTodo, setClickedTodo] = useState('');
  const [editDeleteToggle, setEditDeleteToggle] = useState(true);
  return (
    <div>
      <MyContext.Provider
        value={{
          todos,
          setTodos,
          newTodo,
          setNewTodo,
          clickedTodo,
          setClickedTodo,
          editDeleteToggle,
          setEditDeleteToggle,
        }}
      >
        <TodoApp />
      </MyContext.Provider>
    </div>
  );
}

export default App;
