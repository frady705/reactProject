import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/system';

interface Recipe {
  id: number;
  title: string;
  products: string;
  description: string;
  authorId: number;
}

const RecipesContainer = styled(Box)(() => ({
  display: 'flex',
  height: 'calc(100vh - 64px)', 
  width: '100vw', 
  marginTop: '64px', 
  direction: 'rtl', 
}));

const RecipesListContainer = styled(Box)(({ theme }) => ({
  flexBasis: '50%',
  overflowY: 'auto', 
  padding: '20px',
  backgroundColor: theme.palette.background.default, 
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center', 
}));

const RecipeItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  textAlign: 'center', 
  width: '100%', 
  border: `1px solid ${theme.palette.divider}`, 
  borderRadius: '5px', 
  marginBottom: '10px', 
  transition: 'background-color 0.3s, transform 0.3s', 
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, 
    transform: 'scale(1.05)', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
  },
}));

const RecipeDetailsContainer = styled(Box)(({ theme }) => ({
  flexBasis: '50%',
  position: 'relative',
  padding: '20px',
  backgroundColor: theme.palette.background.paper, 
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`, 
  marginLeft: '20px', 
  marginTop: '30px', 
  maxHeight: '80vh', 
  overflowY: 'auto', 
  display: 'flex',
  flexDirection: 'column',  
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundImage: 'url(/images/6666.jpg)',  
  backgroundSize: "contain",  
  backgroundPosition: 'center',  
  zIndex: 0,  
  opacity: 0.9, 
}));

const RecipeDetailsContent = styled(Paper)(() => ({
  zIndex: 1,  
  backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',  
  textAlign: 'center',  
  color: 'white',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  
  
}));

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <RecipesContainer>
      <RecipesListContainer>
        <Typography variant="h4" gutterBottom align="center">כל המתכונים</Typography>  
        <List>
          {recipes.map((recipe: Recipe) => (
            <RecipeItem key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
              <ListItemText primary={recipe.title} />
            </RecipeItem>
          ))}
        </List>
      </RecipesListContainer>

      {selectedRecipe && (
        <RecipeDetailsContainer>
          <RecipeDetailsContent>
            <Typography variant="h5" gutterBottom align="center">פרטי המתכון</Typography>  
            <Typography align="center"><strong>שם:</strong> {selectedRecipe.title}</Typography>
            <Typography align="center"><strong>מוצרים:</strong> {selectedRecipe.products}</Typography>
            <Typography align="center"><strong>תיאור:</strong> {selectedRecipe.description}</Typography>
          </RecipeDetailsContent>
        </RecipeDetailsContainer>
      )}
    </RecipesContainer>
  );
};

export default Recipes;



