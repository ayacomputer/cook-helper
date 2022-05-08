import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { selectRecipeIds, getSelectedRecipeIds } from '../utils/localStorage';
import { GET_RECIPES } from '../utils/queries';
import { SELECT_RECIPE, DELETE_RECIPE } from '../utils/mutations'
import { Button, Card, Container } from '@mui/material';


export default function Recipes() {
    const { loading, data } = useQuery(GET_RECIPES);
    console.log("data", data)
    const recipes = data?.getRecipes || [];
    console.log("recipes", recipes)
    const [selectRecipe] = useMutation(SELECT_RECIPE);
    const [deleteRecipe] = useMutation(DELETE_RECIPE);
    // const [searchInput, setSearchInput] = useState('');

    const [selectedRecipeIds, setSelectedRecipeIds] = useState(getSelectedRecipeIds());

    useEffect(() => {
        return () => selectRecipeIds(selectedRecipeIds);
    });


    const handleSelectRecipe = async (recipeId) => {
        const recipeToSelect = recipes.find((recipe) => recipe._id === recipeId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await selectRecipe({
                variables: { input: { ...recipeToSelect } },
            });

            setSelectedRecipeIds([...selectedRecipeIds, recipeToSelect._id]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await deleteRecipe({
                variables: { recipeId },
            });


        } catch (err) {
            console.error(err);
        }
        if (loading) {
            return <h2>LOADING...</h2>;
        }
    }



    return (
        <>
            <Container fluid className='text-light bg-dark'>
                <Container>
                    <h1>Recipes</h1>
                </Container>
            </Container>
            <Container>
                <h2>
                    {recipes.length
                        ? `You have ${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                        : 'You have no recipes!'}
                </h2>
                <Card>
                    {recipes.map((recipe, i) => {
                        return (
                            <div key={recipe._id} border='dark'>
                                {recipe.image ? <img src={recipe.image} alt={`The cover for ${recipe.name}`} variant='top' /> : null}
                                <div>
                                    <p>{recipe.name}</p>
                                    <Button className='btn-block btn-danger' onClick={() => handleSelectRecipe(recipe._id)}>
                                        Select
                                    </Button>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </Card>
            </Container>
        </>
    )

}