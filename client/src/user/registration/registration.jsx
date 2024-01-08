import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../../styles/registration.css'

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
                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password does not meet criteria.'),
        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Password confirmation is required.')
    });

    const handleSubmit = async (values, { setSubmitting ,resetForm }) => {
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
            } 
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, resetForm }) => (
                    <Form>
                        <label htmlFor="fName">First Name:</label>
                        <Field id="fName" type="text" name="fName" placeholder="Enter your first name" />
                        <ErrorMessage name="fName" component="div" className="error" />

                        <label htmlFor="lName">Last Name:</label>
                        <Field id="lName" type="text" name="lName" placeholder="Enter your last name" />
                        <ErrorMessage name="lName" component="div" className="error" />

                        <label htmlFor="email">Email:</label>
                        <Field id="email" type="email" name="email" placeholder="Enter your email" />
                        <ErrorMessage name="email" component="div" className="error" />

                        <label htmlFor="password">Password:</label>
                        <Field id="password" type="password" name="password" placeholder="Create a password" />
                        <ErrorMessage name="password" component="div" className="error" />
                        <div className="password-instructions">
                            <small>Password must be at least 6 characters...</small>
                        </div>

                        <label htmlFor="confirmPassword">Password Confirmation:</label>
                        <Field id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm your password" />
                        <ErrorMessage name="confirmPassword" component="div" className="error" />

                        <button type="submit" disabled={isSubmitting || isLoading}>Register</button>
                    </Form>
                )}
            </Formik>
            <SuccessModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    navigate('/login');
                }} 
                message="Registration successful! You can now log in." 
            />
        </div>
    );
}

export default Register;




