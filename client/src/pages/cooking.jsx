import * as React from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, GET_RECIPES_BY_IDS } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Container, Typography } from '@mui/material';
import NavBar from '../layouts/NavBar';

const Cooking = () => {
    const meData = useQuery(QUERY_ME);

    const [removeRecipeId] = useMutation(REMOVE_RECIPE);
    const userData = meData.data?.me || {};
    const selectedRecipeIds = meData.data?.selectedRecipeIds || [];

    console.log("selected", selectedRecipeIds)
    console.log("userData", userData)

    let recipes = useQuery(GET_RECIPES_BY_IDS, { variables: { _id: selectedRecipeIds } });

    console.log("---------recipes:", recipes)

    const handleRemoveRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeRecipeId({
                variables: { recipeId },
            });

        } catch (err) {
            console.error(err);
        }
    };

    // const errors = meData.error || recipes.error;
    const loading = meData.loading || recipes.loading;

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <NavBar />
            <Box>
                <Container fluid="true" className='text-light bg-dark'>
                    <Container>
                        <h1>Today's Meal</h1>
                    </Container>
                </Container>
                <Grid container justify="center">
                    <h2>
                        {recipes.length
                            ? `Viewing ${recipes.length} saved ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                            : 'You have not chosen any recipe yet!'}
                    </h2>
                    <Card>

                        {Array.isArray(recipes) ?
                            recipes.map((recipe) => {
                                return (
                                    <CardActionArea key={recipe._id} border='dark'>

                                        {recipe.image ? <CardMedia component="img" image={recipe.image} alt={`The photo for ${recipe.name}`} /> : null}
                                        <CardContent>
                                            <Typography>{recipe.name}</Typography>
                                            {recipe.steps.map((step) => {
                                                return (
                                                    <p key={step._id}>{step}</p>
                                                )
                                            })}
                                            <Button className='btn-block btn-danger' onClick={() => handleRemoveRecipe(recipe._id)}>
                                                Remove this Recipe!
                                            </Button>
                                        </CardContent>
                                    </CardActionArea>
                                );
                            })
                            :
                            ''
                        }



                    </Card>
                </Grid>
            </Box>

        </>
    );
};

export default Cooking;