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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

const Todo = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [clickedTodo, setClickedTodo] = useState('');
  const [editDeleteToggle, seteditDeleteToggle] = useState(true);
  const [open, setOpen] = React.useState(false);

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleClick = () => {
    setOpen(true);
  };

  const addToDo = () => {
    handleClick();
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
    seteditDeleteToggle(e.target.checked);
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
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Todo added successfully!
          </Alert>
        </Snackbar>
      </Stack>
      {loader ? (
        <CircularProgress color="inherit" />
      ) : (
        <div>
          <List>
            {todos.map((todo) =>
              editDeleteToggle && clickedTodo == todo.id ? (
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
                  <ListItem
                    id={todo.id}
                    key={todo.id}
                    secondaryAction={
                      <div>
                        {
                          <IconButton
                            id={todo.id}
                            key={todo.id}
                            onClick={editDeleteToggle ? setTodo : ''}
                            edge="end"
                            aria-label="edit"
                          >
                            {editDeleteToggle ? (
                              <EditOutlinedIcon
                                id={todo.id}
                                key={todo.id}
                                // onClick={
                                //   editDeleteToggle
                                //     ? alert('Sure you want to delete this todo')
                                //     : ''
                                // }
                              />
                            ) : (
                              <EditOffOutlinedIcon />
                            )}
                          </IconButton>
                        }

                        <IconButton edge="end" aria-label="delete">
                          {editDeleteToggle ? (
                            <DeleteOutlineOutlinedIcon />
                          ) : (
                            <DeleteForeverOutlinedIcon />
                          )}
                        </IconButton>
                      </div>
                    }
                  >
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
