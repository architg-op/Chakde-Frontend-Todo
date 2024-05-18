import { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { v4 as uuid } from 'uuid';

const Todo = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [clickedTodo, setClickedTodo] = useState('');
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    setLoader(true);
    try {
      let data = fetch('https://dummyjson.com/todos').then((response) =>
        response.json().then((res) => setTodos(res.todos))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }, []);

  const addToDo = (e) => {
    e.preventDefault();
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const newData = {
      completed: false,
      id: small_id,
      todo: newTodo,
      userId: small_id,
    };
    setTodos([newData, ...todos]);
    setNewTodo('');
  };

  const todoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const setTodo = (f) => {
    setClickedTodo(f.target.id);
  };

  const toggleChange = (e) => {
    setEditToggle(e.target.checked);
  };

  return (
    <>
      <h1>Todo Application</h1>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Enter a Todo here"
          variant="outlined"
          onChange={todoChange}
          required
        />
        <Button variant="contained" onClick={addToDo}>
          Add
        </Button>
        <FormControlLabel
          control={<Switch />}
          onChange={toggleChange}
          label="Edit Mode"
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
      {loader ? (
        <CircularProgress color="inherit" />
      ) : (
        <div>
          <List>
            {todos.map((todo) =>
              editToggle && clickedTodo == todo.id ? (
                <TextField
                  id={todo.id}
                  key={todo.id}
                  label="Enter a Todo here"
                  variant="outlined"
                  type="text"
                  value={todo.todo}
                />
              ) : (
                <ListItemButton key={todo.id}>
                  <ListItem onClick={setTodo} id={todo.id} key={todo.id}>
                    <ListItemText id={todo.id} key={todo.id}>
                      {todo?.todo}
                    </ListItemText>
                  </ListItem>
                </ListItemButton>
              )
            )}
          </List>
        </div>
      )}
    </>
  );
};

export default Todo;
