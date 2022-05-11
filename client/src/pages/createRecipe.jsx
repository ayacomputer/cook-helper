import { Container, Typography } from '@mui/material';
import React from 'react';
import NavBar from '../layouts/NavBar';
import { CREATE_RECIPE } from '../utils/mutations';

export default function CreateRecipe() {
    const [userFormData, setUserFormData] = useState({ image: '', name: '', ingredients: '', steps: '', totalTime: '', serves: '' });
    const [createRecipe] = useMutation(CREATE_RECIPE);



    return (
        <>
            <NavBar />
            <Container>
                <Typography>Create Recipe</Typography>
                <Form>
                </Form>
            </Container>

        </>

    );
};