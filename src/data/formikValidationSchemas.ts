import * as Yup from 'yup';

const loginSchema = Yup.object({
	email: Yup.string().email('Invalid email!').required('Email is required!'),
	password: Yup.string().min(7, 'Password must have atleast 7 characters!').required('Password is required!'),
});

const registerSchema = Yup.object({
	name: Yup.string().min(2, 'Name must have atleast 2 characters!').required('Name is required'),
	email: Yup.string().email('Invalid email!').required('Email is required!'),
	password: Yup.string().min(7, 'Password must have atleast 7 characters!').required('Password is required!'),
});

export { loginSchema, registerSchema };
