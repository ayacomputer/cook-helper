import { Box, TextField, Typography, Container, Button, Card, FormGroup } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import NavBar from '../layouts/NavBar';
import { CREATE_RECIPE } from '../utils/mutations';
import IngredientForm from '../components/ingredientForm';
import StepsForm from '../components/stepsForm';

export default function CreateRecipe() {
    const [recipeFormData, setRecipeFormData] = useState();
    const [createRecipe] = useMutation(CREATE_RECIPE);


    const formSubmitHandler = () => {

    }



    return (
        <>
            <NavBar />
            <Typography variant="h3">Create Recipe</Typography>
            <FormGroup>
                <TextField>

                </TextField>

                <Container>
                    <IngredientForm />
                    <StepsForm />
                </Container>


                <Button>Save</Button>
            </FormGroup>



        </>

    );
};