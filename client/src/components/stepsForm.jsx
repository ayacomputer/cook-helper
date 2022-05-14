import { TextField, Typography, Container, Button, Box } from '@mui/material';
import React from 'react';


export default function StepsForm({ steps, setSteps }) {


    const handleStepFormChange = (event, index) => {
        let data = [...steps];
        data[index][event.target.name] = event.target.value;
        setSteps(data);
    }

    const addStepField = () => {
        let object = {
            step: '',
        }
        setSteps([...steps, object])
    }
    const removeStepField = (index) => {
        let data = [...steps];
        data.splice(index, 1)
        setSteps(data)
    }

    return (
        <>
            <Box container style={{ padding: "0.2em", margin: "0.2em" }}>
                <Typography variant="h5" style={{ textAlign: "left" }}>Instructions :</Typography>
                {steps.map((step, index) => (
                    <div key={index}>
                        <Container style={{ display: "flex", justifyDirection: "column", textAlign: "center", margin: "0.4em" }}>
                            <TextField
                                id="ingredientName"
                                name="step"
                                label={`Step ${index + 1}`}
                                type="text"
                                onChange={event => handleStepFormChange(event, index)}
                                size="standard"
                                fullWidth
                            />
                            <Button onClick={() => removeStepField(index)}>Remove </Button>
                        </Container>

                    </div>

                ))}
                <Button onClick={addStepField}>Add More..</Button>
            </Box>

        </>

    );
};