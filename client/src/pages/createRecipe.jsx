import { Box, TextField, Typography, Container, Button, Card } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import NavBar from '../layouts/NavBar';
import { CREATE_RECIPE } from '../utils/mutations';
import IngredientForm from '../components/ingredientForm';

export default function CreateRecipe() {
    // const [recipeFormData, setRecipeFormData] = useState({ image: '', name: '', ingredients: '', steps: '', totalTime: '', serves: '' });
    // const [createRecipe] = useMutation(CREATE_RECIPE);



    return (
        <>
            <IngredientForm />


        </>

    );
};