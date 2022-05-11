import { TextField, Typography, Container, Button, Card } from '@mui/material';
import React, { useState } from 'react';


export default function StepsForm() {

    const [steps, setSteps] = useState([
        { step: '' }
    ])
    const handleFormChange = (event, index) => {
        let data = [...steps];
        data[index][event.target.name] = event.target.value;
        setSteps(data);
    }

    const addFields = () => {
        let object = {
            step: '',
        }
        setSteps([...steps, object])
    }
    const removeIngredientsFields = (index) => {
        let data = [...steps];
        data.splice(index, 1)
        setSteps(data)
    }

    return (
        <>
            <Card container style={{ width: "30%", padding: "0.2em" }}>
                <Typography variant="h5" style={{ textAlign: "left" }}>Instructions :</Typography>
                {steps.map((form, index) => {
                    return (
                        <> <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center" }}>

                            <TextField
                                item
                                id="ingredientName"
                                name="step"
                                label="Step"
                                type="text"
                                onChange={event => handleFormChange(event, index)}
                                value={form.step}
                                size="standard"
                                fullWidth
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