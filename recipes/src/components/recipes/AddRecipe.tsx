import React, { useContext, useState } from 'react';
import { UserContext } from "../user/userReducer";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography} from '@mui/material';
import ErrorCom from './ErrorCom';

const AddRecipe = () => {
    const navigate = useNavigate();
    const { state: user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [products, setProducts] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<string | null>(null);

    if (!user.id) return (
      <ErrorCom />
    );

    const handleTitleChange = (e:any) => {
        const value = e.target.value;
        if (value.length > 25) {
            setTitleError('שם המתכון לא יכול להכיל יותר מ-25 תווים');
        } else {
            setTitleError(null);
        }
        setTitle(value);
    }

    const handleSubmit = async (e: React.FormEvent, shouldRedirect: boolean) => {
        e.preventDefault();

        if (!title || !products || !description) {
            setError('נא למלא את כל השדות');
            return;
        }

        if (title.length > 25) {
            setTitleError('שם המתכון לא יכול להכיל יותר מ-25 תווים');
            return;
        }

        const recipeData = {title, products, description };

        try {
            const response = await fetch("http://localhost:3000/api/recipes/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
               'user-id': `${user.id}`
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Error adding recipe');
            }

            alert('מתכון נוסף בהצלחה!');
            setError(null);
            setTitleError(null);

            if (shouldRedirect) {
                navigate("/"); // מעבר לעמוד הראשי
            } else {
                // איפוס השדות אחרי הוספת מתכון
                setTitle('');
                setProducts('');
                setDescription('');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Dialog open={true} onClose={() => navigate("/")}>
            <DialogTitle style={{ textAlign: 'center' }}>הוספת מתכון חדש</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        margin="dense"
                        label="שם המתכון"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                        // inputProps={{ maxLength: 25 }}
                        required
                        error={!!titleError}
                        helperText={titleError}
                    />
                    <TextField
                        margin="dense"
                        label="מוצרים"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="הוראות הכנה"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                     
                    {error && <Typography color="error" style={{ textAlign: 'center' }}>{error}</Typography>}
                </form>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button 
                  onClick={() => navigate("/")} 
                  style={{ backgroundColor: '#004d40', color: 'white' }}
                >
                    ביטול
                </Button>
                <Button 
                  onClick={(e) => handleSubmit(e, false)} 
                  style={{ backgroundColor: '#004d40', color: 'white' }}
                >
                    שמירה והוספת מתכון נוסף
                </Button>
                <Button 
                  onClick={(e) => handleSubmit(e, true)} 
                  style={{ backgroundColor: '#004d40', color: 'white' }}
                >
                    שמירת מתכון
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRecipe