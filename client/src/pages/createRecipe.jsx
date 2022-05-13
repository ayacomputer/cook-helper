import { Box, TextField, Typography, Container, Button, Card, FormGroup, Grid } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import NavBar from '../layouts/NavBar';
import { CREATE_RECIPE } from '../utils/mutations';
import IngredientForm from '../components/ingredientForm';
import StepsForm from '../components/stepsForm';
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
    const [CreateRecipe] = useMutation(CREATE_RECIPE);
    const [recipeFields, setRecipeFields] = useState([
        { image: '', name: '', serves: '' },
    ]);
    const [ingredientsFields, setIngredientsFields] = useState([
        { name: '', qty: '' },
    ]);
    const [stepsFields, setStepsFields] = useState([
        { step: '' },
    ])
    const imageUrl = useRef('');
    const navigate = useNavigate();

    const myWidget = window.cloudinary?.createUploadWidget({
        cloudName: 'ayacomputer',
        uploadPreset: 'cook_helper',
        multiple: false,
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            imageUrl.current = result.info.url;
        }
    }
    )

    const openCloudinaryWidget = () => {
        myWidget.open();
    }


    const handleRecipeFormChange = (event, index) => {
        let data = [...recipeFields];
        data[index || 0][event.target.name] = event.target.value;

        setRecipeFields(data);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("data-------", ...recipeFields, stepsFields, ingredientsFields);

        try {
            await CreateRecipe({
                variables: {
                    input: {
                        ...recipeFields[0],
                        totalTime: Number(recipeFields[0].totalTime),
                        image: imageUrl.current,
                        serves: Number(recipeFields[0].serves),
                        steps: stepsFields.map((s) => s.step),
                        ingredients: ingredientsFields
                    }
                }
            });

            setRecipeFields([{ image: '', name: '', serves: '' },]);
            setIngredientsFields([{ name: '', qty: '' },]);
            setStepsFields([{ step: '' },]);


            // redirect to /recipes
            navigate('/recipes');

        } catch (err) {
            console.error(err);
        }
    }

    const numberForms = [
        {
            label: "Total Time (mins)",
            name: "totalTime",
            id: "totalTime",
        },
        {

            label: "Serves",
            name: "serves",
            id: "serves",
        }
    ]
    return (
        <>
            <NavBar />
            <Card style={{ padding: "3rem" }}>
                <Typography variant="h3">Create Recipe</Typography>
                <FormGroup>
                    <Container component="main">
                        <Box sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }} style={{ padding: "0.2em" }}>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Recipe Name"
                                        type="text"
                                        onChange={event => handleRecipeFormChange(event)}
                                        size="standard"
                                        fullWidth
                                        autoFocus
                                        style={{ padding: "0.3em" }}
                                    />
                                    <Button variant="contained" onClick={openCloudinaryWidget}>Upload Image</Button>
                                    {numberForms.map((numForm, i) => (
                                        <TextField
                                            key={i}
                                            required
                                            id={numForm.id}
                                            name={numForm.name}
                                            label={numForm.label}
                                            type="number"
                                            onChange={event => handleRecipeFormChange(event)}
                                            size="standard"
                                            autoFocus
                                            style={{ padding: "0.3em" }}
                                        />

                                    ))}
                                </Grid>


                                <Grid item xs={12} md={12}>
                                    <IngredientForm setIngredients={setIngredientsFields} ingredients={ingredientsFields} />
                                    <StepsForm setSteps={setStepsFields} steps={stepsFields} />
                                </Grid>


                            </Grid>

                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={event => handleFormSubmit(event)}>Save</Button>
                    </Container>
                </FormGroup>
            </Card>



        </>

    );
};