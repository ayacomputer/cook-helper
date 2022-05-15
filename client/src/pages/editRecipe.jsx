import { Box, TextField, Typography, Container, Button, Card, FormGroup, Grid, ButtonBase } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavBar from '../components/NavBar';
import { UPDATE_RECIPE } from '../utils/mutations';
import { GET_ONE_RECIPE } from '../utils/queries';
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Fab from '@mui/material/Fab';
import { useParams } from 'react-router-dom';


export default function EditRecipe() {
    const [recipeFields, setRecipeFields] = useState([
        { image: '', name: '', serves: '' },
    ]);
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { _id } = useParams();
    const navigate = useNavigate();
    const imageUrl = useRef('');

    const [UpdateRecipe] = useMutation(UPDATE_RECIPE);

    const { loading, data, refetch: refetchRecipe } = useQuery(GET_ONE_RECIPE,
        { variables: { id: _id } });

    useEffect(() => {
        const selectedRecipe = data?.getOneRecipe || {};
        setSelectedRecipe(selectedRecipe);
        setIsLoading(loading);
    }, [loading, data]);

    if (isLoading) {
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
        event.preventDefault();
        let data = [...recipeFields];
        data[index || 0][event.target.name] = event.target.value;

        setRecipeFields(data);
    }



    // for ingredientForm
    const handleIngredientFormChange = (event, index) => {
        event.preventDefault();
        setSelectedRecipe(recipe => {
            let remainingIngredients = recipe.ingredients.map(x => Object.assign({}, x));
            remainingIngredients[index][event.target.name] = event.target.value;
            return {
                ...recipe,
                ingredients: remainingIngredients

            }

        })
    }


    const addIngredientField = (event) => {
        event.preventDefault();
        setSelectedRecipe(recipe => ({
            ...recipe,
            ingredients: [
                ...recipe.ingredients,
                { name: " ", qty: " " },
            ]
        }))
    }


    const removeIngredientField = (index) => {
        setSelectedRecipe(recipe => {
            let remainingIngredients = [...recipe.ingredients];
            remainingIngredients.splice(index, 1);
            return {
                ...recipe,
                ingredients: remainingIngredients

            }
        })
    }

    // / for step

    const handleStepFormChange = (event, index) => {
        setSelectedRecipe(recipe => {
            let remainingSteps = [...recipe.steps];
            console.log("-----------remainingSteps", remainingSteps);
            remainingSteps[index] = event.target.value;
            return {
                ...recipe,
                steps: remainingSteps
            }
        })

    }

    const addStepField = (event) => {
        event.preventDefault();
        setSelectedRecipe(recipe => ({
            ...recipe,
            steps: [
                ...recipe.steps,
                '',
            ]
        }));
    }

    const removeStepField = (index) => {
        console.log(selectedRecipe.steps)
        setSelectedRecipe(recipe => {
            let remainingSteps = [...recipe.steps];
            remainingSteps.splice(index, 1);

            return {
                ...recipe,
                steps: remainingSteps

            }
        })
    }




    const handleUpdateFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("-----HERE changed?----", selectedRecipe, recipeFields)
        console.log("selectedRecipe.steps", selectedRecipe.steps)



        try {
            await UpdateRecipe({
                variables: {
                    input: {
                        ...selectedRecipe[0],
                        _id: _id,
                        totalTime: Number(recipeFields[0].totalTime),
                        image: `${imageUrl.current ? imageUrl.current : selectedRecipe.image}`,
                        serves: Number(recipeFields[0].serves),
                        steps: selectedRecipe.steps,
                        ingredients: selectedRecipe.ingredients
                    }
                }
            });

            setRecipeFields([{ image: '', name: '', serves: '' },]);
            setSelectedRecipe({});

            await refetchRecipe();
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
                                <Grid item xs={12}>
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
                                    <Grid item xs={12} >
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


                                <Grid item xs={12}>
                                    <Box container style={{ padding: "0.2em" }}>
                                        <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                                        {selectedRecipe.ingredients?.map((ingredient, index) => (
                                            <div key={`ingredient-${index}`} >
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
                                        {selectedRecipe.steps?.map((step, index) => (
                                            <div key={`step-${index}`}>
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
                                        <Button variant="contained" onClick={addStepField}>Add More..</Button>
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