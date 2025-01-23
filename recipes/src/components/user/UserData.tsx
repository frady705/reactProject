import { useContext } from "react"
import { UserContext } from "./userReducer"
import UpdateUser from "./UpdateUser";
import { Avatar, Box, Typography} from "@mui/material";
import Logout from "./LogOut";

 
 
  const UserData = () => {
    const { state: user } = useContext(UserContext);
    return (
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:"flex-start",
        padding:'10px',
        marginLeft:'20px',
        position:'absolute',
        top:'0',
        left:'0'}}
      >
        <Avatar sx={{ bgcolor: "#004d40", marginRight: "10px" }}>
          {user.firstName[0] || user.email[0]}
        </Avatar>
        <Typography variant="body1" sx={{ margin: "0", padding: "0 10px" }}>
          🙋 שלום לך: {user.firstName || user.email}
        </Typography>
        <Box display='flex' gap='10px'>
          <UpdateUser />
          <Logout />
        </Box>
      </Box>
    );
  };
  
  export default UserData;
  






