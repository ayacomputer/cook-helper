import { TextField, Typography, Container, Button, Box, IconButton, Grid } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';



export default function IngredientForm({ ingredients, setIngredients }) {


    const handleIngredientFormChange = (event, index) => {
        let data = [...ingredients];
        data[index][event.target.name] = event.target.value;
        setIngredients(data);
    }

    const addIngredientField = () => {
        let object = {
            name: '',
            qty: ''
        }
        setIngredients([...ingredients, object])
    }

    const removeIngredientField = (index) => {
        let data = [...ingredients];
        data.splice(index, 1)
        setIngredients(data)
    }

    return (
        <>
            <Grid container direction="column" style={{ "padding": "0.2em", "width": "50%", "justifyContent": "center" }}>
                <Grid item>
                    <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                </Grid>
                {ingredients.map((ingredient, index) => (
                    <Grid item key={`ingredient-${index}`} xs={10}>
                        <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                            <TextField
                                id="ingredientQty"
                                name="qty"
                                label="quantity"
                                type="text"
                                onChange={event => handleIngredientFormChange(event, index)}
                                size="standard"
                                style={{ marginRight: "0.2em" }}
                                color="success"
                            />
                            <TextField
                                id="ingredientName"
                                name="name"
                                label="Ingredient name"
                                type="text"
                                onChange={event => handleIngredientFormChange(event, index)}
                                size="standard"
                                style={{ marginLeft: "0.2em" }}
                                color="success"
                            />
                            <IconButton style={{ "marginLeft": "0.5em" }} onClick={() => removeIngredientField(index)}>
                                <DeleteIcon />
                            </IconButton>

                        </Container>

                    </Grid>
                ))
                }
                <Grid item container style={{ justifyContent: "center" }}>
                    <Grid>
                        <Button color="success" variant="outlined" onClick={addIngredientField} style={{ "marginRight": "10em" }}>Add More..</Button>
                    </Grid>
                </Grid>

            </Grid>






        </>

    );
};