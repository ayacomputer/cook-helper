import React, { useState } from 'react';
import { CREATE_USER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Fab } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';



const theme = createTheme();

export default function SignUp() {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [createUser] = useMutation(CREATE_USER);

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
            const { data } = await createUser(
                { variables: { ...userFormData } });
            Auth.login(data.createUser.token);
            console.log(data.createUser.token)
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="gray">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate validated={validated} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {showAlert && (
                            <Alert dismissible="true" icon={<ErrorIcon />} onClose={() => setShowAlert(false)} variant='danger'>
                                Something went wrong with your signup!
                            </Alert>
                        )}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={userFormData.username}
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={userFormData.email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={userFormData.password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Fab
                            type="submit"
                            variant="extended"
                            sx={{ mt: 3, mb: 2 }}
                        ><LoginIcon />  SIGN UP
                        </Fab>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}