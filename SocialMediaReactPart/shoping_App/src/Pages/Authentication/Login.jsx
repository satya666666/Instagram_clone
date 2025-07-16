// import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../redux/Auth/auth.action'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: ''
};

// ✅ Validation Schema
const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is Required"),
    password: yup.string().min(4, "Password must be at least 6 characters").required("Password is Required")
});

const Login = () => {

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleOnSubmit = async (values, { setSubmitting }) => {
        console.log(' Submitted values:', values); // ✅ Debugging

        try {
            dispatch(loginUserAction(values)); // ✅ Send values directly
            console.log(" Login dispatched successfully");
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setSubmitting(false);
        }

    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='space-y-5'>
                        <div className='space-y-5'>

                            <div>
                                <Field as={TextField}
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name='email' component={'div'} className='text-red-600' />
                            </div>

                            <div>
                                <Field as={TextField}
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name='password' component={'div'} className='text-red-600' />
                            </div>

                            <Button
                                color='primary'
                                variant='contained'
                                fullWidth
                                sx={{ padding: '0.8rem 0rem' }}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>

                        </div>
                    </Form>
                )}
            </Formik>
            <div className='flex gap-1 items-center justify-center pt-4'>
                <p>if you don&#39;t have Account ?</p>
                <Button onClick={() => { navigation('/register') }}>Register</Button>
            </div>

        </>
    );
}

export default Login;
