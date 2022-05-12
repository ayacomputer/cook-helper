import { TextField, Typography, Container, Button, Box } from '@mui/material';
import React from 'react';


export default function IngredientForm({ ingredients, setIngredients }) {


    const handleFormChange = (event, index) => {
        let data = [...ingredients];
        data[index][event.target.name] = event.target.value;
        setIngredients(data);
    }

    const addFields = () => {
        let object = {
            name: '',
            qty: ''
        }
        setIngredients([...ingredients, object])
    }

    const removeIngredientsFields = (index) => {
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
                        <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center" }}>
                            <TextField
                                id="ingredientQty"
                                name="qty"
                                label="quantity"
                                type="text"
                                onChange={event => handleFormChange(event, index)}
                                value={ingredient.qty}
                                size="standard"
                            />
                            <TextField
                                id="ingredientName"
                                name="name"
                                label="Ingredient name"
                                type="text"
                                onChange={event => handleFormChange(event, index)}
                                value={ingredient.name}
                                size="standard"
                            />
                            <Button onClick={() => removeIngredientsFields(index)}>Remove </Button>
                        </Container>
                    </div>

                )
                )
                }
                <Button onClick={addFields}>Add More..</Button>
            </Box>






        </>

    );
};