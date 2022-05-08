import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { selectRecipeIds, getSelectedRecipeIds } from '../utils/localStorage';
import { GET_ONE_RECIPES } from '../utils/queries';
import { SELECT_RECIPE, DELETE_RECIPE } from '../utils/mutations'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import NavBar from '../layouts/NavBar';
import { Icon } from '@iconify/react'


export default function Recipe() {
    const [getOneRecipe] = useQuery(GET_ONE_RECIPE);
    const selectedRecipe = getOneRecipe({ variables: { _id } });


    c
    const fontFamily = [
        'Nunito',
        'Comforter',
        'Roboto'
    ].join(',');

    const styles = {
        mainContainer: {
            background: "rgb(32, 33, 36)",
            height: "100%"
        },
        cardContainer: {
            maxWidth: "80%",
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
            maxWidth: "100%",
            objectFit: "cover top"
        }
    };



    return (
        <>
            <NavBar />
            <Box component="div" style={styles.mainContainer}>
                <h3>RECIPE</h3>

                <Grid container justify="center">

                    <Grid item xs={12} sm={6} md={4} xl={3} key={selectedRecipe._id} >
                        <Card style={styles.cardContainer} elevation="8" className="recipe">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={`The cover for ${selectedRecipe.name}`}
                                    height="300vh"
                                    image={selectedRecipe.image}
                                    style={styles.img}

                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom style={styles.green}>
                                        {selectedRecipe.name}
                                    </Typography>
                                    <Typography style={styles.wheat}>
                                        Cooking time: {selectedRecipe.totalTime} mins
                                    </Typography>
                                    <Typography style={styles.wheat}>
                                        {selectedRecipe.ingredients}
                                    </Typography>
                                    <Typography style={styles.wheat}>
                                        {selectedRecipe.steps}
                                    </Typography>


                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                <Button variant="outlined" style={styles.wheat} onClick={() => handleEditRecipe(recipe._id)} startIcon={<Icon icon="fluent:select-all-on-20-filled" />} >Select</Button>
                                <Button variant="outlined" style={styles.wheat} onClick={() => handleDeleteRecipe(recipe._id)} startIcon={<Icon icon="fluent:delete-24-filled" />}>Delete</Button>


                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Box>

        </>)

}