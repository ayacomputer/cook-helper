import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Container, Fab, Link, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { Alert } from '@mui/material';

import Auth from '../utils/auth';
import { USER_LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../components/logo.png'





export default function Login() {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [userLogin] = useMutation(USER_LOGIN);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target)
        setUserFormData({ ...userFormData, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await userLogin({
                variables: { ...userFormData },
            });
            Auth.login(data.login.token);
            console.log(data.login.token)
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (

        <Card>
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 3, className: 'dark' }}>
                        <img src={logo} style={{ "width": "2em", "height": "2em", "margin": "0.8em" }} alt="logo" />
                    </Avatar>
                    <h4 component="h1" variant="h5" className="text-dark">
                        Cook Helper
                    </h4>
                    {showAlert && (
                        <Alert color='error' icon={<ErrorIcon />} dismissible="true" onClose={() => setShowAlert(false)} variant='danger'>
                            Something went wrong with your login!
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} validated={validated} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleInputChange}
                            value={userFormData.email}
                            autoFocus
                            color="success"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputChange}
                            value={userFormData.password}
                            color="success"
                        />
                        <Fab
                            type="submit"
                            variant="extended"
                            sx={{ mt: 3, mb: 2 }}
                        ><LoginIcon />  LOG IN
                        </Fab>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2" className="text-dark">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>


        </Card>


    );
}
