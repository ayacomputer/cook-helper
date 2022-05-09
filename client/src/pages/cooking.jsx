import * as React from 'react';

import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button, Card, Container, Typography } from '@mui/material';
import NavBar from '../layouts/NavBar';

const Cooking = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);
    const userData = data?.me || {};

    const handleRemoveRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeRecipe({
                variables: { recipeId },
            });

            removeRecipeId(recipeId);
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
            <Container fluid className='text-light bg-dark'>
                <Container>
                    <h1>Today's Meal</h1>
                </Container>
            </Container>
            <Container>
                <h2>
                    {userData.selectedRecipes.length
                        ? `Viewing ${userData.selectedRecipes.length} saved ${userData.selectedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
                        : 'You have not chosen any recipe yet!'}
                </h2>
                <Card>
                    {userData.selectedRecipes.map((recipe) => {
                        return (
                            <Card key={recipe._id} border='dark'>
                                {recipe.image ? <Card.Img src={recipe.image} alt={`The photo for ${recipe.name}`} variant='top' /> : null}
                                <Card>
                                    <Typography>{recipe.name}</Typography>
                                    {recipe.steps.map((step) => {
                                        return (
                                            <p key={step._id}>{step}</p>
                                        )
                                    })}
                                    <Button className='btn-block btn-danger' onClick={() => handleRemoveRecipe(recipe._id)}>
                                        Remove this Recipe!
                                    </Button>
                                </Card>
                            </Card>
                        );
                    })}
                </Card>
            </Container>
        </>
    );
};

export default Cooking;