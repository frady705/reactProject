import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/userReducer';
import { styled } from '@mui/system';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  padding: '0 10px',
  '&:hover': {
    color: "#004d40",
    transform: 'scale(1.1)',
  },
});

const Navbar: React.FC = () => {
  const { state: user } = useContext(UserContext);

  const commonLinks = (
    <>
      <StyledLink to="/">דף הבית</StyledLink>
      <StyledLink to="/recipes">כל המתכונים</StyledLink>
      <StyledLink to={user.id ? "/add-recipe" : "/error"}>הוספת מתכון</StyledLink>
    </>
  );

  return (
    <nav style={{
      direction: "rtl",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: 'center',
      position: "absolute",
      top: 0,
      right: 0,
      padding: '10px',
      gap: '10px',
      height: '50px', 
      backgroundColor: '#f0f0f0', 
      borderRadius: '0 0 10px 10px', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      {commonLinks}
    </nav>
  );
};

export default Navbar;
