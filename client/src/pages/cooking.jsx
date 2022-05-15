import React, { useState } from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, GET_RECIPES_BY_IDS } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button, Box, Grid, Card, CardActionArea, CardMedia, Container, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Fab } from '@mui/material';
import NavBar from '../components/NavBar';
import { styles } from '../utils/style';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cooking = () => {
    const meData = useQuery(QUERY_ME);
    const navigate = useNavigate();

    const [removeRecipeId] = useMutation(REMOVE_RECIPE);
    const userData = meData.data?.me || {};
    const selectedRecipeIds = userData.selectedRecipeIds || [];

    console.log("-----selectedRecipesIds : ", selectedRecipeIds)
    console.log("-----userData", userData)

    let results = useQuery(GET_RECIPES_BY_IDS, { variables: { id: selectedRecipeIds } })
    let recipes = results?.data?.getRecipesByIds || [];



    console.log("---------recipes:", recipes)
    const loading = meData.loading || results.loading;

    const handleRemoveRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeRecipeId({
                variables: { id: recipeId }
            });

            await meData.refetch();
            await results.refetch();

        } catch (err) {
            console.error(err);
        }
    };


    if (loading) {
        return <h2>LOADING...</h2>;
    }
    const handleBackToRecipes = () => {
        navigate("/recipes")
    }

    return (
        <>
            <NavBar />
            <Box component="div" style={styles.mainContainer}>

                <Grid container fluid="true" className='text-light' style={{ "padding": "0.8rem" }}>
                    <Grid item xs={1}>
                        <Fab justify="left" onClick={handleBackToRecipes}><ArrowBackIcon /></Fab>
                    </Grid>

                    <Grid item xs={11}>
                        <h3>COOKING</h3>
                        <p>
                            {recipes.length
                                ? `Viewing ${recipes.length} selected ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                                : 'You have not selected any recipe yet!'}
                        </p>

                    </Grid>

                </Grid>

                <Grid container style={{ "justifyContent": "center", "overflowX": "scroll", "display": "flex", "flexDirection": "row" }}>
                    {recipes.map((recipe, i) => (
                        <Grid item key={i} xs={4} sm={4} md={4} xl={4} style={{ margin: "0.2rem" }} >
                            <Card style={styles.cardContainer} elevation={8} className="cookingRecipe">
                                <Box border='dark'>
                                    <Typography variant="h5" style={styles.green}>
                                        {recipe.name}
                                    </Typography>
                                    <Typography variant="h6" style={styles.wheat}>
                                        Total Time: {recipe.totalTime} mins
                                    </Typography>
                                    <Typography variant="h6" style={styles.wheat}>
                                        Serves: {recipe.serves}
                                    </Typography>
                                    <Grid container style={{ "textAlign": "left", "padding": "0.2em" }}>
                                        {recipe.image ?
                                            <CardMedia component="img" image={recipe.image} alt={`The photo for ${recipe.name}`} style={styles.img} /> : null}
                                        <Card xs={12} sm={6} md={6} xl={6} style={{ "textAlign": "left", "padding": "0.2em", "width": "50%" }}>
                                            <Typography variant="h5">Ingredients:    </Typography>
                                            <hr style={{ color: "gray" }} />
                                            <Grid style={{ "overflowY": "scroll" }}>

                                                {recipe.ingredients.map((ingredient, i) => (
                                                    <Typography key={i}><b>{ingredient.qty}</b>&nbsp;
                                                        {ingredient.name}</Typography>
                                                ))}


                                            </Grid>


                                        </Card>
                                    </Grid>

                                    {recipe.steps.map((step, i) => (

                                        <Accordion key={i} defaultExpanded={true} style={{ "textAlign": "left" }} disableGutters={true} TransitionProps={{ unmountOnExit: true }}>

                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header">
                                                <Typography key={step._id}>
                                                    Step {i + 1}:
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {step}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                    ))}

                                </Box>
                                <Box style={{ "padding": "0.8rem" }}>
                                    <Fab variant="extended" onClick={() => handleRemoveRecipe(recipe._id)}>
                                        <RemoveCircleIcon /> Remove this Recipe!</Fab>
                                </Box>


                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </>)

}

export default Cooking;