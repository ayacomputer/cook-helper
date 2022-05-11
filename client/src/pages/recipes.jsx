import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
// import { selectRecipeIds, getSelectedRecipeIds } from '../utils/localStorage';
import { GET_RECIPES } from '../utils/queries';
import { SELECT_RECIPE, DELETE_RECIPE } from '../utils/mutations'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import NavBar from '../layouts/NavBar';
import { Icon } from '@iconify/react'
import { fontFamily } from '../utils/style'


export default function Recipes() {
    console.log("-------------------------recipe page---------------------------------")
    const { loading, data } = useQuery(GET_RECIPES);
    console.log("data", data)
    const recipes = data?.getRecipes || [];
    console.log("recipes", recipes)
    const [selectRecipe] = useMutation(SELECT_RECIPE);
    const [deleteRecipe] = useMutation(DELETE_RECIPE);
    const [searchInput, setSearchInput] = useState('');

    // const [selectedRecipeIds, setSelectedRecipeIds] = useState(getSelectedRecipeIds());

    // useEffect(() => {
    //     return () => selectRecipeIds(selectedRecipeIds);
    // });


    const handleSelectRecipe = async (selectedRecipeId) => {
        console.log('selectedRecipeId', selectedRecipeId);

        const recipeToSelect = recipes.find((recipe) => recipe._id === selectedRecipeId);
        const recipeIdToAdd = recipeToSelect._id
        console.log("recipeToSelect", recipeToSelect)
        console.log("recipeIdToADD", recipeIdToAdd)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        ///// Need to figure out the bug here: back end works  
        try {
            console.log('recipeToSelectId---------', recipeToSelect._id)
            console.log("typeof_", typeof (recipeToSelect._id))
            console.log("recipeId to add: ", recipeIdToAdd)
            const { data } = await selectRecipe({ variables: { id: recipeIdToAdd } });
            console.log('recipeToSelectId---------', recipeIdToAdd)
            // setSelectedRecipeIds([...selectedRecipeIds, recipeToSelect._id]);
        } catch (err) {
            console.error("Error in handleSelectRecipe: ", err);
        }
    };


    const handleDeleteRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            await deleteRecipe({
                variables: { id: recipeId },
            });

        } catch (err) {
            console.error(err);
        }
        if (loading) {
            return <h2>LOADING...</h2>;
        }
    }

    const styles = {
        mainContainer: {
            background: "rgb(32, 33, 36)",
            height: "100%"
        },
        cardContainer: {
            maxwidth: "80%",
            margin: "3rem auto",
            background: "inherit",
        },
        wheat: {
            color: "wheat",
            border: "none",
            fontWeight: "bold",
            fontFamily: fontFamily
        },
        green: {
            color: "rgba(150, 202, 27, 0.911)",
            fontFamily: fontFamily,
            fontWeight: "Bold"
        },
        img: {
            background: "rgb(32, 33, 36)",
            maxwidth: "100%",
            objectFit: "cover top"
        }
    };



    return (
        <>
            <NavBar />
            <Box component="div" style={styles.mainContainer}>
                <h3>RECIPES</h3>
                <h4 style={styles.green}>
                    {recipes.length
                        ? `You have ${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                        : 'You have no recipes!'}
                </h4>
                <Grid container justify="center">
                    {recipes.map((recipe, i) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={recipe._id} >
                            <Card style={styles.cardContainer} elevation={8} className="recipe">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={`The cover for ${recipe.name}`}
                                        height="300vh"
                                        image={recipe.image}
                                        style={styles.img}

                                    />
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom style={styles.green}>
                                            {recipe.name}
                                        </Typography>
                                        <Typography style={styles.wheat}>
                                            Cooking time: {recipe.totalTime} mins
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>

                                    <Button variant="outlined" style={styles.wheat} onClick={() => handleSelectRecipe(recipe._id)} startIcon={<Icon icon="fluent:select-all-on-20-filled" />} >Select</Button>
                                    <Button variant="outlined" style={styles.wheat} onClick={() => handleDeleteRecipe(recipe._id)} startIcon={<Icon icon="fluent:delete-24-filled" />}>Delete</Button>


                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>)

}