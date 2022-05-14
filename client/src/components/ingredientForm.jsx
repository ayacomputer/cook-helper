import { TextField, Typography, Container, Button, Box } from '@mui/material';
import React from 'react';


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
            <Box container style={{ padding: "0.2em" }}>
                <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                            <TextField
                                id="ingredientQty"
                                name="qty"
                                label="quantity"
                                type="text"
                                onChange={event => handleIngredientFormChange(event, index)}
                                size="standard"
                                style={{ marginRight: "0.2em" }}
                            />
                            <TextField
                                id="ingredientName"
                                name="name"
                                label="Ingredient name"
                                type="text"
                                onChange={event => handleIngredientFormChange(event, index)}
                                size="standard"
                                style={{ marginLeft: "0.2em" }}
                            />
                            <Button onClick={() => removeIngredientField(index)}>Remove </Button>
                        </Container>
                    </div>

                ))
                }
                <Button onClick={addIngredientField}>Add More..</Button>
            </Box>






        </>

    );
};