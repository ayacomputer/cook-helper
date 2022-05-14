import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { GET_ONE_RECIPE } from '../utils/queries';
import { DELETE_RECIPE } from '../utils/mutations'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';



export default function Recipe() {
    console.log("-------------------------viewing single recipe page---------------------------------")
    const { _id } = useParams();
    const navigate = useNavigate();
    console.log("param is:", _id)
    const { loading, data, refetch: refetchRecipe } = useQuery(GET_ONE_RECIPE,
        { variables: { id: _id } });


    console.log("data", data)


    const selectedRecipe = data?.getOneRecipe || {};
    console.log("selectedRecipe", selectedRecipe)

    if (loading) {
        return <div>Loading...</div>;
    }

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

    const handleEditRecipe = (selectedRecipeId) => {
        navigate(`/recipes/${selectedRecipeId}/edit`)

    }
    const handleBackToRecipes = () => {
        navigate("/recipes")
    }
    return (
        <>

            <NavBar />
            <Grid container justify="center">
                <Fab onClick={handleBackToRecipes}><ArrowBackIcon /></Fab>


                <Grid style={{ "justifyContent": "center" }}>
                    <Card style={styles.cardContainer} elevation={8} className="cookingRecipe">
                        <Box xs={12} sm={6} md={6} xl={6}>
                            <Typography variant="h5" style={styles.green}>{selectedRecipe.name}</Typography>
                            <Typography variant="h6" style={styles.wheat}>Total Time: {selectedRecipe.totalTime} mins</Typography>
                            <Typography variant="h6" style={styles.wheat}>Serves: {selectedRecipe.serves}</Typography>
                        </Box>
                        <Grid container direction="row" xs={12} sm={12} md={12} xl={12} style={{ margin: "0.2rem" }} >

                            <Grid xs={12} sm={6} md={6} xl={6} style={{ "textAlign": "left", "padding": "0.2em" }}>
                                {selectedRecipe.image ? <CardMedia component="img" image={selectedRecipe.image} alt={`The photo for ${selectedRecipe.name}`} style={styles.img} /> : null}
                            </Grid>
                            <Grid xs={12} sm={6} md={6} xl={6}>
                                <Card xs={12} sm={12} md={12} xl={12} style={{ "textAlign": "left", "padding": "0.2em" }}>
                                    <Typography variant="h5">Ingredients: </Typography>
                                    {selectedRecipe.ingredients.map((ingredient, i) => (
                                        <Typography key={i}><b>{ingredient.qty}</b>  {ingredient.name}</Typography>
                                    ))}
                                </Card>

                                {selectedRecipe.steps.map((step, i) => (

                                    <Accordion key={i} defaultExpanded={true} style={{ "textAlign": "left", "padding": "0.2em" }} disableGutters={true} TransitionProps={{ unmountOnExit: true }}>

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

                            </Grid>

                            <Fab variant="extended" onClick={() => handleEditRecipe(selectedRecipe._id)}><EditIcon sx={{ mr: 1 }} />
                                Edit
                            </Fab>
                        </Grid>
                    </Card>


                </Grid>

            </Grid>
        </>)

}