import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ONE_RECIPE } from '../utils/queries';
import { SELECT_RECIPE, DELETE_RECIPE } from '../utils/mutations'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { Icon } from '@iconify/react'


export default function Recipe(_id) {
    console.log("-------------------------viewing single recipe page---------------------------------")
    const [getOneRecipe] = useQuery(GET_ONE_RECIPE);
    const selectedRecipe = getOneRecipe({ variables: { _id } });


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

    const handleEditRecipe = () => {

    }

    return (
        <>

            <NavBar />
            <Grid container justify="center">
                <Grid item xs={6} sm={6} md={6} xl={3} key={selectedRecipe._id} >
                    <Card style={styles.cardContainer} elevation={8} className="recipe">
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
                            <Button variant="outlined" style={styles.wheat} onClick={() => handleEditRecipe(selectedRecipe._id)} startIcon={<Icon icon="fluent:select-all-on-20-filled" />} >Select</Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>

        </>)

}