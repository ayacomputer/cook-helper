import { Box, TextField, Typography, Container, Button, Card, FormGroup, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import NavBar from '../layouts/NavBar';
import { CREATE_RECIPE } from '../utils/mutations';
import IngredientForm from '../components/ingredientForm';
import StepsForm from '../components/stepsForm';
import CssBaseline from '@mui/material/CssBaseline';

export default function CreateRecipe() {
    // const [recipeFormData, setRecipeFormData] = useState();
    // const [createRecipe] = useMutation(CREATE_RECIPE);
    const [recipeFields, setRecipeFields] = useState([
        { image: '', name: '', serves: '' },
    ])

    const handleRecipeFormChange = (event, index) => {
        let data = [...recipeFields];
        data[index][event.target.name] = event.target.value;
        setRecipeFields(data);
    }


    return (
        <>
            <NavBar />
            <Typography variant="h3">Create Recipe</Typography>
            <FormGroup>
                <Container component="main" maxWidth="xs" >
                    <Box sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} style={{ padding: "0.2em" }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    item
                                    required
                                    id="recipeName"
                                    name="name"
                                    label="Recipe Name"
                                    type="text"
                                    onChange={event => handleRecipeFormChange(event)}
                                    value="name"
                                    size="standard"
                                    fullWidth
                                    autoFocus
                                />
                                <TextField
                                    item
                                    id="imageUrl"
                                    name="imageUrl"
                                    label="Image URL"
                                    type="text"
                                    onChange={event => handleRecipeFormChange(event)}
                                    value="image"
                                    size="standard"
                                    fullWidth
                                    autoFocus
                                />
                                <TextField
                                    item
                                    required
                                    id="totalTime"
                                    name="totalTime"
                                    label="Total Time (mins)"
                                    type="number"
                                    onChange={event => handleRecipeFormChange(event)}
                                    value="totalTime"
                                    size="standard"
                                    autoFocus

                                />
                                <TextField
                                    item
                                    required
                                    id="serves"
                                    name="serves"
                                    label="Serves"
                                    type="number"
                                    onChange={event => handleRecipeFormChange(event)}
                                    value="serves"
                                    size="standard"
                                    autoFocus

                                />



                            </Grid>
                            <Grid item xs={12} md={6}>
                                <IngredientForm />
                                <StepsForm />


                            </Grid>


                        </Grid>

                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Save</Button>
                </Container>
            </FormGroup>



        </>

    );
};