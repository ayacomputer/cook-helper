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
        { image: '', name: '', serves: '' },
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

    //  photo 

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

    //recipe

    const handleRecipeFormChange = (event, index) => {
        let data = [...recipeFields];
        data[index || 0][event.target.name] = event.target.value;

        setRecipeFields(data);
    }

    // for ingredientForm
    const handleIngredientFormChange = (event, index) => {
        let data = [...ingredientsFields];
        data[index][event.target.name] = event.target.value;
        setIngredientsFields(data);
    }

    const addIngredientField = () => {
        let object = {
            name: '',
            qty: ''
        }
        setIngredientsFields([...ingredientsFields, object])
    }

    const removeIngredientField = (index) => {
        let data = [...ingredientsFields];
        data.splice(index, 1)
        setIngredientsFields(data)
    }


    /// for step

    const handleStepFormChange = (event, index) => {
        let data = [...stepsFields];
        data[index][event.target.name] = event.target.value;
        setStepsFields(data);
    }

    const addStepField = () => {
        let object = {
            step: '',
        }
        setStepsFields([...stepsFields, object])
    }
    const removeStepField = (index) => {
        let data = [...stepsFields];
        data.splice(index, 1)
        setStepsFields(data)
    }



    const handleUpdateFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("data-------", ...recipeFields, stepsFields, ingredientsFields);


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
                                        defaultValue={selectedRecipe.name}
                                        onChange={event => handleRecipeFormChange(event)}
                                        size="standard"
                                        fullWidth
                                        autoFocus
                                        style={{ padding: "0.3em" }}
                                    />
                                    <Grid item xs={12} md={12}>
                                        <Fab variant="extended" onClick={openCloudinaryWidget}><AddAPhotoIcon sx={{ mr: 1 }} />Upload Image</Fab>
                                    </Grid>

                                    <TextField
                                        required
                                        id="totalTime"
                                        name="totalTime"
                                        label="Total Time"
                                        defaultValue={selectedRecipe.totalTime}
                                        type="number"
                                        onChange={event => handleRecipeFormChange(event)}
                                        size="standard"
                                        autoFocus
                                        style={{ padding: "0.3em" }}
                                    />
                                    <TextField
                                        required
                                        id="serves"
                                        name="serves"
                                        label="Serves"
                                        defaultValue={selectedRecipe.serves}
                                        type="number"
                                        onChange={event => handleRecipeFormChange(event)}
                                        size="standard"
                                        autoFocus
                                        style={{ padding: "0.3em" }}
                                    />


                                </Grid>


                                <Grid item xs={12} md={12}>
                                    <Box container style={{ padding: "0.2em" }}>
                                        <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                                        {selectedRecipe.ingredients.map((ingredient, index) => (
                                            <div key={index}>
                                                <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                                                    <TextField
                                                        id="ingredientQty"
                                                        name="qty"
                                                        label="quantity"
                                                        type="text"
                                                        defaultValue={ingredient.qty}
                                                        onChange={event => handleIngredientFormChange(event, index)}
                                                        size="standard"
                                                        style={{ marginRight: "0.2em" }}
                                                    />
                                                    <TextField
                                                        id="ingredientName"
                                                        name="name"
                                                        label="Ingredient name"
                                                        type="text"
                                                        defaultValue={ingredient.name}
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

                                    <Box container style={{ padding: "0.2em", margin: "0.2em" }}>
                                        <Typography variant="h5" style={{ textAlign: "left" }}>Instructions :</Typography>
                                        {selectedRecipe.steps.map((step, index) => (
                                            <div key={index}>
                                                <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                                                    <TextField
                                                        id="ingredientName"
                                                        name="step"
                                                        label={`Step ${index + 1}`}
                                                        type="text"
                                                        defaultValue={step}
                                                        onChange={event => handleStepFormChange(event, index)}
                                                        size="standard"
                                                        fullWidth
                                                    />
                                                    <Button onClick={() => removeStepField(index)}>Remove </Button>
                                                </Container>

                                            </div>

                                        ))}
                                        <Button onClick={addStepField}>Add More..</Button>
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