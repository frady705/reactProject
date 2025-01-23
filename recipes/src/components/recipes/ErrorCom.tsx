import { Box, Typography } from '@mui/material';

const Error = () => {
  return (
    <Box sx={{display:"flex", 
      alignItems:"center", 
      justifyContent:"center" ,
      height:"calc(100vh - 64px)", 
      width:"100vw",
      position:"fixed",
      top:"64px",
      left:"0",
      bgcolor:"#efebe9"}}
      
    >
      <Typography 
        variant="h6" 
        component="div" 
        bgcolor="#004d40" 
        color='white'
        p={4} 
        borderRadius={10} 
        textAlign="center"
      >
        🙁 עליך להיות מחובר כדי להוסיף מתכון
      </Typography>
    </Box>
  );
}

export default Error;




 