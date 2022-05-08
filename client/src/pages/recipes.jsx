import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import Auth from '../utils/auth';
// import { selectRecipeIds, getSelectedRecipeIds } from '../utils/localStorage';
import { GET_RECIPES } from '../utils/queries';
import { Button, Card, Container } from '@mui/material';


export default function Recipes() {
    const { loading, data } = useQuery(GET_RECIPES);
    const recipes = data?.getRecipes || {};

    // const [selectRecipe, { error }] = useQuery(SELECT_RECIPE);
    // // const [searchInput, setSearchInput] = useState('');
    // const [selectedRecipeIds, setSelectedRecipeIds] = useState(getSelectedRecipeIds());

    // useEffect(() => {
    //     return () => selectRecipeIds(selectedRecipeIds);
    // });


    // const handleSelectRecipe = async (recipeId) => {
    //     // const recipeToSelect = searchedRecipes.find((recipe) => recipe._id === recipeId);
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await selectRecipe({
    //             variables: { input: { ...recipeToSelect } },
    //         });

    //         setSelectedRecipeIds([...selectedRecipeIds, recipeToSelect._id]);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    if (loading) {
        return <h2>LOADING...</h2>;
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
                        ? `Viewing ${recipes.length} saved ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                        : 'You have no recipes!'}
                </h2>
                <Card>
                    {recipes.map((recipe) => {
                        return (
                            <Card key={recipe._id} border='dark'>
                                {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.name}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{recipe.name}</Card.Title>
                                    {/* <Button className='btn-block btn-danger' onClick={() => handleSelectRecipe(recipe._id)}>
                                        Select
                                    </Button>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe._id)}>
                                        Delete
                                    </Button> */}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Card>
            </Container>
        </>
    )

}