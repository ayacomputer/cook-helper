import React, { useState } from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, GET_RECIPES_BY_IDS } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button, Box, Grid, Card, CardActionArea, CardMedia, Container, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';
import NavBar from '../layouts/NavBar';
import { styles } from '../utils/style'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Cooking = () => {
    const meData = useQuery(QUERY_ME);

    // const [expanded, setExpanded] = useState(true);
    // const handleClickStep = (panel) => (event, isExpanded) => {
    //     console.log(panel)
    //     console.log(isExpanded)
    //     setClosed(isExpanded ? panel : false);
    // };

    const [removeRecipeId] = useMutation(REMOVE_RECIPE);
    const userData = meData.data?.me || {};
    const selectedRecipeIds = userData.selectedRecipeIds || [];

    console.log("-----selectedRecipesIds : ", selectedRecipeIds)
    console.log("-----userData", userData)

    let results = useQuery(GET_RECIPES_BY_IDS, { variables: { id: selectedRecipeIds } })
    let recipes = results?.data?.getRecipesByIds || [];



    console.log("---------recipes:", recipes)
    // const errors = meData.error || results.error;
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


    return (
        <>
            <NavBar />
            <Box component="div" style={styles.mainContainer}>
                <Container fluid="true" className='text-light bg-dark'>
                    <Typography justify="center">
                        Today's Meal
                    </Typography>
                    <h4 style={{ "textAlign": "center" }}>
                        {recipes.length
                            ? `Viewing ${recipes.length} selected ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                            : 'You have not selected any recipe yet!'}
                    </h4>
                </Container>
                <Grid container style={{ "justifyContent": "center" }}>
                    {recipes.map((recipe, i) => (
                        <Grid item key={recipe._id} xs={12} sm={6} md={4} xl={3} style={{ margin: "0.2rem" }} >
                            <Card style={styles.cardContainer} elevation={8} className="cookingRecipe">
                                <CardActionArea border='dark'>
                                    <Typography variant="h5" style={styles.green}>{recipe.name}</Typography>
                                    <Typography variant="h6" style={styles.wheat}>Total Time: {recipe.totalTime} mins</Typography>
                                    <Typography variant="h6" style={styles.wheat}>Serves: {recipe.serves}</Typography>
                                    <Grid container style={{ "textAlign": "left", "padding": "0.2em" }}>
                                        {recipe.image ? <CardMedia component="img" image={recipe.image} alt={`The photo for ${recipe.name}`} style={styles.img} /> : null}
                                        <Card item xs={12} sm={6} md={6} xl={6} style={{ "textAlign": "left", "padding": "0.2em", "width": "50%" }}>
                                            <Typography variant="h5">Ingredients: </Typography>
                                            {recipe.ingredients.map((ingredient, i) => (
                                                <Typography key={ingredient._id}><b>{ingredient.qty}</b>  {ingredient.name}</Typography>
                                            ))}
                                        </Card>
                                    </Grid>


                                    {recipe.steps.map((step, i) => (

                                        <Accordion key={step._id} defaultExpanded={true} style={{ "textAlign": "left", "padding": "0.2em" }} disableGutters={true} TransitionProps={{ unmountOnExit: true }}>

                                            <AccordionSummary
                                                disableSpacing={true}
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
                                    <Button className='btn-block btn-danger' onClick={() => handleRemoveRecipe(recipe._id)}>
                                        Remove this Recipe!
                                    </Button>

                                </CardActionArea>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </>)

}

export default Cooking;