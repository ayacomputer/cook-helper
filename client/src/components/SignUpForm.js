import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();


        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser(
                { variables: { ...userFormData } });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
    };

    return (
        <>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your signup!
                </Alert>

                <Form.Group>
                    <Form.Label htmlFor='firstName'>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='First Name'
                        name='First Name'
                        onChange={handleInputChange}
                        value={userFormData.firstName}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Please Enter Your First Name!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Last Name'
                        name='Last Name'
                        onChange={handleInputChange}
                        value={userFormData.lastName}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Please Enter Your Last Name!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Your email address'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;