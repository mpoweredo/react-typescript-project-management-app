import { loginSchema } from 'data/formikValidationSchemas';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from 'store/authContext';
import TestAccount from './TestAccount';

const classes = {
	container: 'flex items-center justify-center h-screen px-3',
	card: 'w-full max-w-[440px] bg-[#181a1d] h-auto rounded-md px-4 py-6 flex flex-col gap-7',
	title: 'font-bold text-3xl text-white text-center',
	input: 'bg-[#212428] w-full h-10 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 placeholder:text-gray-600',
	form: 'flex flex-col gap-4',
	label: 'text-xl text-[#8c8e92] font-semibold',
	button: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
	p: 'text-[17px] text-[#76787b] font-medium mt-5',
	error: '!text-red-400 mt-2',
};

const LoginForm = () => {
	const { loginUser } = UserAuth();
	const navigate = useNavigate();

	return (
		<div className={classes.container}>
			<div className={classes.card}>
				<h1 className={classes.title}>Sign In</h1>
				<div className='w-full'>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={loginSchema}
						onSubmit={async values => {
							await loginUser(values.email, values.password);
							navigate('/');
						}}>
						{({ errors, touched }) => (
							<Form className={classes.form}>
								<div className='flex flex-col gap-1'>
									<label htmlFor='email' className={classes.label}>
										Email
									</label>
									<Field
										placeholder='example@example.com'
										type='email'
										id='email'
										name='email'
										className={`${classes.input} ${touched.email && errors.email && 'outline outline-1 !outline-red-400'}`}
									/>
									<ErrorMessage name='email'>{msg => <p className={classes.error}>{msg}</p>}</ErrorMessage>
								</div>
								<div className='flex flex-col gap-1'>
									<label htmlFor='password' className={classes.label}>
										Password
									</label>
									<Field
										type='password'
										id='password'
										name='password'
										className={`${classes.input} ${touched.password && errors.password && 'outline outline-1 !outline-red-400'}`}
									/>
									<ErrorMessage name='password'>{msg => <p className={classes.error}>{msg}</p>}</ErrorMessage>
								</div>
								<button className={classes.button}>Sign in</button>
							</Form>
						)}
					</Formik>
					<TestAccount />
					<p className={classes.p}>
						Don't have account? Create new{' '}
						<span
							onClick={() => {
								navigate('/signup');
							}}
							className='text-indigo-500 cursor-pointer'>
							here
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
