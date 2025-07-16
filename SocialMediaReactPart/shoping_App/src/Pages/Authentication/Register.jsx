import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormControlLabel, Radio, TextField, RadioGroup } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
};

const validationSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup.string().email("Invalid Email").required("Email is Required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
    gender: yup.string().required("Gender is Required"),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleOnSubmit = (values) => {
        console.log('Submitted values:', values);
        dispatch(registerUserAction(values))
            .then(() => {
                // Navigate to login page after successful registration
                navigation('/login');
            });
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className='space-y-5'>
                        <div className='space-y-5'>
                            <div>
                                <Field as={TextField} name="firstName" placeholder="Enter First Name" type="text" variant="outlined" fullWidth />
                                <ErrorMessage name='firstName' component={'div'} className='text-red-600' />
                            </div>

                            <div>
                                <Field as={TextField} name="lastName" placeholder="Enter Last Name" type="text" variant="outlined" fullWidth />
                                <ErrorMessage name='lastName' component={'div'} className='text-red-600' />
                            </div>

                            <div>
                                <Field as={TextField} name="email" placeholder="Enter Email" type="email" variant="outlined" fullWidth />
                                <ErrorMessage name='email' component={'div'} className='text-red-600' />
                            </div>

                            <div>
                                <Field as={TextField} name="password" placeholder="Enter Password" type="password" variant="outlined" fullWidth />
                                <ErrorMessage name='password' component={'div'} className='text-red-600' />
                            </div>

                            <div>
                                <RadioGroup row name="gender" value={values.gender} onChange={(event) => setFieldValue("gender", event.target.value)}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                                <ErrorMessage name='gender' component={'div'} className='text-red-600' />
                            </div>

                            <Button color='primary' variant='contained' fullWidth sx={{ padding: '0.8rem 0rem' }} type='submit'>
                                Register
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className='flex gap-1 items-center justify-center pt-4'>
                <p>if you have already Account ?</p>
                <Button onClick={() => { navigation('/login') }}>Login</Button>
            </div>
        </>
    );
};

export default Register;
