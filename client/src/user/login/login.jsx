import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link} from 'react-router-dom';
import '../../styles/login.css'; 


function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required.'),
        password: Yup.string().required('Password is required.')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('authToken', data.token);
                navigate('/games'); // Redirect to dashboard or home page
            } else {
                // Handle errors like incorrect credentials
                console.error('Login failed');
            }
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <label htmlFor="email">Email:</label>
                        <Field id="email" type="email" name="email" placeholder="Enter your email" />
                        <ErrorMessage name="email" component="div" className="error" />

                        <label htmlFor="password">Password:</label>
                        <Field id="password" type="password" name="password" placeholder="Enter your password" />
                        <ErrorMessage name="password" component="div" className="error" />

                        <button type="submit" disabled={isSubmitting || isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
}

export default Login;
