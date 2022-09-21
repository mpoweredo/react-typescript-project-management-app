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

const newTaskSchema = Yup.object({
	taskTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required('This field is required!'),
});

const taskTitleSchema = Yup.object({
	taskTitle: Yup.string().min(4).required(),
});

const subtaskTitleSchema = Yup.object({
	subtaskTitle: Yup.string().min(2).required(),
});

const columnTitleSchema = Yup.object({
	columnTitle: Yup.string().min(2).required(),
});

const eventTitleSchema = Yup.object({
	eventTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required('This field is required!'),
});

export { loginSchema, registerSchema, newTaskSchema, taskTitleSchema, subtaskTitleSchema, columnTitleSchema, eventTitleSchema };
