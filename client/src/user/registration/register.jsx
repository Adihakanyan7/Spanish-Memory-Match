import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../../styles/register.css'

function SuccessModal({ isOpen, onClose, message }) {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current?.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <p>{message}</p>
                <button ref={closeButtonRef} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function Register() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        fName: Yup.string().required('First name is required.'),
        lName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Invalid email format').required('Email is required.'),
        password: Yup.string()
                     .required('Password is required.')
                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must have at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long."),
        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Password confirmation is required.')
    });

    const handleSubmit = async (values, { setSubmitting ,resetForm, setFieldError }) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                setIsModalOpen(true);
                resetForm();
            } else if (response.status === 409) { 
                const result = await response.json();
                setFieldError('email', result.message); // Set the error message for the email field
            } else {
                // Handle other errors
                const errorResult = await response.json();
                console.error('Registration failed:', errorResult.message);
            }
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, resetForm }) => (
                    <Form>
                        <label htmlFor="fName" className="form-label">First Name:</label>
                        <Field id="fName" type="text" name="fName" placeholder="Enter your first name" className="form-field" />
                        <ErrorMessage name="fName" component="div" className="error" />

                        <label htmlFor="lName" className="form-label">Last Name:</label>
                        <Field id="lName" type="text" name="lName" placeholder="Enter your last name" className="form-field"/>
                        <ErrorMessage name="lName" component="div" className="error" />

                        <label htmlFor="email" className="form-label">Email:</label>
                        <Field id="email" type="email" name="email" placeholder="Enter your email" className="form-field"/>
                        <ErrorMessage name="email" component="div" className="error" />

                        <label htmlFor="password" className="form-label">Password:</label>
                        <Field id="password" type="password" name="password" placeholder="Create a password" className="form-field"/>
                        <ErrorMessage name="password" component="div" className="error" />
                        <div className="password-instructions">
                            <small>Password must have at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.</small>
                        </div>

                        <label htmlFor="confirmPassword" className="form-label">Password Confirmation:</label>
                        <Field id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm your password" className="form-field"/>
                        <ErrorMessage name="confirmPassword" component="div" className="error" />

                        <button type="submit" disabled={isSubmitting || isLoading} className="submit-button">Register</button>
                    </Form>
                )}
            </Formik>
            <SuccessModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    navigate('/');
                }} 
                message="Registration successful! You can now log in." 
            />
        </div>
    );
}

export default Register;




