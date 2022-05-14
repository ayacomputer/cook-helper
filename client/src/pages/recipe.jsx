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

    const handleEditRecipe = () => {


    }
    const handleBackToRecipes = () => {
        navigate("/recipes")
    }
    return (
        <>

            <NavBar />
            <Grid container justify="center">
                <Fab onClick={handleBackToRecipes}><ArrowBackIcon /></Fab>
                <Grid container direction="row" style={{ "justifyContent": "center", "overflowX": "scroll" }}>

                    <Grid item xs={4} sm={4} md={4} xl={4} style={{ margin: "0.2rem" }} >
                        <Card style={styles.cardContainer} elevation={8} className="cookingRecipe">
                            <CardActionArea border='dark'>
                                <Typography variant="h5" style={styles.green}>{selectedRecipe.name}</Typography>
                                <Typography variant="h6" style={styles.wheat}>Total Time: {selectedRecipe.totalTime} mins</Typography>
                                <Typography variant="h6" style={styles.wheat}>Serves: {selectedRecipe.serves}</Typography>
                                <Grid container style={{ "textAlign": "left", "padding": "0.2em" }}>
                                    {selectedRecipe.image ? <CardMedia component="img" image={selectedRecipe.image} alt={`The photo for ${selectedRecipe.name}`} style={styles.img} /> : null}
                                    <Card xs={12} sm={6} md={6} xl={6} style={{ "textAlign": "left", "padding": "0.2em", "width": "50%" }}>
                                        <Typography variant="h5">Ingredients: </Typography>
                                        {selectedRecipe.ingredients.map((ingredient, i) => (
                                            <Typography key={i}><b>{ingredient.qty}</b>  {ingredient.name}</Typography>
                                        ))}
                                    </Card>
                                </Grid>


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

                            </CardActionArea>
                            <Button className='btn-block btn-danger' onClick={() => handleEditRecipe(selectedRecipe._id)}>
                                Edit
                            </Button>
                        </Card>
                    </Grid>

                </Grid>

            </Grid>
        </>)

}