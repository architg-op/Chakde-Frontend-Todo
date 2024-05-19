import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import { v4 as uuid } from 'uuid';

function TodoForm() {
  const { todos, setTodos } = useContext(MyContext);
  const { newTodo, setNewTodo } = useContext(MyContext);
  const { editDeleteToggle, setEditDeleteToggle } = useContext(MyContext);

  const todoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const toggleChange = (e) => {
    setEditDeleteToggle(e.target.checked);
  };

  const addToDo = () => {
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

  return (
    <div>
      {' '}
      <h1>Todo Application</h1>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Enter a Todo here"
          variant="outlined"
          onChange={todoChange}
          value={newTodo}
          required
        />
        <Button
          variant="contained"
          onClick={addToDo}
          disabled={!newTodo.length}
        >
          Add
        </Button>
        <FormControlLabel
          control={<Switch defaultChecked />}
          onChange={toggleChange}
          label="Edit - Delete Mode"
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
    </div>
  );
}

export default TodoForm;
