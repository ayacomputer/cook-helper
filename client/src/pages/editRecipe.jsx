import { Box, TextField, Typography, Container, Button, Card, FormGroup, Grid } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavBar from '../components/NavBar';
import { UPDATE_RECIPE } from '../utils/mutations';
import { GET_ONE_RECIPE } from '../utils/queries';
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Fab from '@mui/material/Fab';
import { useParams } from 'react-router-dom';

export default function EditRecipe() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const imageUrl = useRef('');
    const [UpdateRecipe] = useMutation(UPDATE_RECIPE);

    console.log("param is:", _id)
    const { loading, data } = useQuery(GET_ONE_RECIPE,
        { variables: { id: _id } });
    console.log("data", data)


    const selectedRecipe = data?.getOneRecipe || {};
    console.log("selectedRecipe", selectedRecipe)

    const [recipeFields, setRecipeFields] = useState([
        { image: selectedRecipe.image, name: selectedRecipe.name, serves: selectedRecipe.serves },
    ]);
    const [ingredientsFields, setIngredientsFields] = useState([
        { name: selectedRecipe.name, qty: selectedRecipe.gty },
    ]);
    const [stepsFields, setStepsFields] = useState([
        { step: selectedRecipe.step },
    ])


    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("selectedRecipe", selectedRecipe)


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

    const handleUpdateFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("data-------", ...recipeFields, stepsFields, ingredientsFields);



        // for ingredientForm





        /// for step



        try {
            await UpdateRecipe({
                variables: {
                    input: {
                        ...recipeFields[0],
                        _id: _id,
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
            navigate(`/recipe/${_id}`);

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
                <Typography variant="h3">Edit Recipe</Typography>
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
                                    <Grid item xs={12} md={12}>
                                        <Fab variant="extended" onClick={openCloudinaryWidget}><AddAPhotoIcon sx={{ mr: 1 }} />Upload Image</Fab>
                                    </Grid>
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
                                    <Box container style={{ padding: "0.2em" }}>
                                        <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index}>
                                                <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                                                    <TextField
                                                        id="ingredientQty"
                                                        name="qty"
                                                        label="quantity"
                                                        type="text"
                                                        onChange={event => handleIngredientFormChange(event, index)}
                                                        size="standard"
                                                        style={{ marginRight: "0.2em" }}
                                                    />
                                                    <TextField
                                                        id="ingredientName"
                                                        name="name"
                                                        label="Ingredient name"
                                                        type="text"
                                                        onChange={event => handleIngredientFormChange(event, index)}
                                                        size="standard"
                                                        style={{ marginLeft: "0.2em" }}
                                                    />
                                                    <Button onClick={() => removeIngredientField(index)}>Remove </Button>
                                                </Container>
                                            </div>

                                        ))
                                        }
                                        <Button onClick={addIngredientField}>Add More..</Button>
                                    </Box>







                                </Grid>


                            </Grid>

                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={event => handleUpdateFormSubmit(event)}>Edit</Button>
                    </Container>
                </FormGroup>
            </Card>



        </>

    );
};