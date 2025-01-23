import React, { useContext, useRef, useState } from "react";
import { UserContext } from "./userReducer";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const Login = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOpen = (type: 'login' | 'signup') => {
    setOpen(true);
    setIsLogin(type === 'login');
    setIsSignUp(type === 'signup');
  };

  const handleClose = () => setOpen(false);

  const handleAlert = (message: string) => {
    alert(message);
    handleClose();
  };

  const handleLogin = async () => {
    const url = isLogin ? 'http://localhost:3000/api/user/login' : 'http://localhost:3000/api/user/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        }),
      });

      if (response.status === 401) {
        handleAlert('משתמש לא מוכר נסה להרשם');
      } else if (!response.ok) {
        handleAlert('משתמש כבר רשום למערכת');
        throw new Error(`fetch error ${response.status}`);
      } else {
        if (isSignUp) {
          const { userId } = await response.json();
          userDispatch({
            type: "SIGNUP", data: {
              id: userId,
              email: emailRef.current?.value || '',
              password: emailRef.current?.value || ''
            }
          });
        } else if (isLogin) {
          const { user } = await response.json();
          userDispatch({
            type: "LOGIN", data: user
          });
        }
        handleClose();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      emailRef.current!.value = '';
      passwordRef.current!.value = '';
      isLogin && setIsLogin(false);
      isSignUp && setIsSignUp(false);
    }
  };

  return (
    <>
      <nav style={{
        display: "flex",
        justifyContent: "flex-start",
        position: "absolute",
        top: 0,
        left: 0,
        padding: 2,
        gap: 2,
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          onClick={() => handleOpen('login')}
          style={{ backgroundColor: '#4db6ac', color: 'white' }}
        >
          התחברות
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => handleOpen('signup')}
          style={{ backgroundColor: '#4db6ac', color: 'white' }}
        >
          הרשמה
        </Button>
      </nav>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isLogin ? 'התחברות' : 'הרשמה'}
          </Typography>
          <div>
            <TextField
              label="אימייל"
              type="email"
              inputRef={emailRef}
              fullWidth
              margin="normal"
            />
            <TextField
              label="סיסמה"
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ backgroundColor: '#4db6ac', color: 'white', marginTop: '1em' }}
            >
              {isLogin ? 'כניסה' : 'הרשמה'}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Login;

