import  { useContext } from "react";
import { UserContext } from "./userReducer";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Logout = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogout = () => {
    userDispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Button 
      onClick={handleClickLogout} 
      variant="contained" 
      color="primary"
      style={{ backgroundColor: '#4db6ac', color: 'white' }}
    >
      התנתקות מהמערכת
    </Button>
  );
};

export default Logout;

