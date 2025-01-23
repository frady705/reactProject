import  { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserContext } from "./userReducer";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateUser = () => {
  const { state: user, dispatch: userDispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    userDispatch({ type: 'UPDATE', data: { [id]: value } });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/user`, user, {
        headers: {
          'Content-Type': 'application/json',
          'user-id': `${user.id}`,
          'access-control-allow-origin': '*',
        }
      });
      userDispatch({ type: 'UPDATE', data: res.data });
      alert('הפרטים נשמרו בהצלחה!');
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button 
        onClick={handleOpen} 
        variant="contained" 
        color="primary"
        style={{ backgroundColor: '#4db6ac', color: 'white' }}
      >
        עדכן פרטים
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            עדכון פרטים
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="שם פרטי"
              type="text"
              value={user.firstName}
              onChange={handleChange}
              id='firstName'
              fullWidth
              margin="normal"
            />
            <TextField
              label="שם משפחה"
              type="text"
              value={user.lastName}
              onChange={handleChange}
              id='lastName'
              fullWidth
              margin="normal"
            />
            <TextField
              label="אימייל"
              type="email"
              value={user.email}
              onChange={handleChange}
              id='email'
              fullWidth
              margin="normal"
            />
            <TextField
              label="כתובת"
              type="text"
              value={user.address}
              onChange={handleChange}
              id='address'
              fullWidth
              margin="normal"
            />
            <TextField
              label="טלפון"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              id='phone'
              fullWidth
              margin="normal"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              style={{ marginTop: '1em', backgroundColor: '#4db6ac', color: 'white' }}
            >
              עדכון
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
