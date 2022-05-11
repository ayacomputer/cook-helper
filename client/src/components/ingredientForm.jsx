import { TextField, Typography, Container, Button, Card } from '@mui/material';
import React, { useState } from 'react';


export default function IngredientForm() {

    const [ingredientsFields, setIngredientsFields] = useState([
        { name: '', qty: '' },
    ])
    const handleFormChange = (event, index) => {
        let data = [...ingredientsFields];
        data[index][event.target.name] = event.target.value;
        setIngredientsFields(data);
    }

    const addFields = () => {
        let object = {
            name: '',
            qty: ''
        }
        setIngredientsFields([...ingredientsFields, object])
    }
    const removeIngredientsFields = (index) => {
        let data = [...ingredientsFields];
        data.splice(index, 1)
        setIngredientsFields(data)
    }

    return (
        <>
            <Card container style={{ width: "30%", padding: "0.2em" }}>
                <Typography variant="h5" style={{ textAlign: "left" }} >Ingredients :</Typography>
                {ingredientsFields.map((form, index) => {
                    return (
                        <> <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center" }}>

                            <TextField
                                item
                                id="ingredientName"
                                name="name"
                                label="Ingredient name"
                                type="text"
                                onChange={event => handleFormChange(event, index)}
                                value={form.name}
                                size="standard"
                            />
                            <TextField
                                item
                                id="ingredientQty"
                                name="qty"
                                label="quantity"
                                type="text"
                                onChange={event => handleFormChange(event, index)}
                                value={form.qty}
                                size="standard"
                            />
                            <Button onClick={() => removeIngredientsFields(index)}>Remove </Button>
                        </Container>

                        </>

                    )
                })
                }
                <Button onClick={addFields}>Add More..</Button>
            </Card>






        </>

    );
};