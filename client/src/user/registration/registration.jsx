import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

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
        password: Yup.string().required('Password is required.')
                   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password does not meet criteria.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required.')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                alert('Registration successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                // Handle form error here
            }
        } catch (error) {
            console.error('There was an error:', error);
            // Handle error here
        } finally {
            setSubmitting(false);
        }
    };

    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
    {({ isSubmitting }) => (
        <Form>
            <label>
                First Name:
                <Field type="text" name="fName" placeholder="Enter your first name" />
                <ErrorMessage name="fName" component="div" className="error" />
            </label>
            <label>
                Last Name:
                <Field type="text" name="lName" placeholder="Enter your last name" />
                <ErrorMessage name="lName" component="div" className="error" />
            </label>
            <label>
                Email:
                <Field type="email" name="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="error" />
            </label>
            <label>
                Password:
                <Field type="password" name="password" placeholder="Create a password" />
                <ErrorMessage name="password" component="div" className="error" />
                <div className="password-instructions">
                    <small>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.</small>
                </div>
            </label>
            <label>
                Password Confirmation:
                <Field type="password" name="confirmPassword" placeholder="Confirm your password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
            </label>
            <button type="submit" disabled={isSubmitting}>Register</button>
        </Form>
    )}
</Formik>
}

export default Register;

