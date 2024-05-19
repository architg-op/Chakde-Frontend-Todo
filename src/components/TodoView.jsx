import { useContext } from 'react';
import { MyContext } from '../MyContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

function TodoView() {
  const { todos, setTodos } = useContext(MyContext);
  const { newTodo, setNewTodo } = useContext(MyContext);
  const { clickedTodo, setClickedTodo } = useContext(MyContext);
  const { editDeleteToggle, seteditDeleteToggle } = useContext(MyContext);
  const [editOn, setEditOn] = useState(false);
  const [editedTodo, setEditedTodo] = useState('');

  const setTodo = (f) => {
    setClickedTodo(f.target.id);
    setEditOn(true);
  };

  const handleCancel = () => {
    setEditOn(false);
  };

  const updateTodo = () => {};

  return (
    <div>
      <List>
        {todos.map((todo) =>
          editDeleteToggle && editOn && clickedTodo == todo.id ? (
            <Stack key={todo.id} direction="row" spacing={3}>
              <TextField
                id={todo.id}
                key={todo.id}
                label="Enter updated Todo"
                variant="outlined"
                type="text"
                value={editedTodo}
              />
              <Button
                id={todo.id}
                key={todo.id}
                variant="contained"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button id={todo.id} key={todo.id} variant="contained">
                Submit
              </Button>
            </Stack>
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
  );
}

export default TodoView;
