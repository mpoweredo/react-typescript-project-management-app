import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const classes = {
	createButton: 'w-36 h-11 font-semibold rounded bg-indigo-500 text-slate-900 hover:bg-indigo-600 self-center lg:self-start',
	popupOverlay: 'w-screen absolute top-1/2 left-1/2 h-screen bg-[#0000004D] translate-y-[-50%] translate-x-[-50%] z-10',
	popupCard:
		'w-4/5 max-w-[400px] h-auto bg-[#181a1c] absolute translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2 rounded-lg px-4 py-6 z-20 flex flex-col',
	text: 'text-white font-semibold text-2xl text-center',
	input: 'bg-[#212428] w-full h-10 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300 mt-5',
	error: 'text-red-400 mt-2',
	button: 'w-full h-11 mt-4 rounded font-semibold bg-[#0d0e10] text-[#bdbdbf] hover:bg-[#101114]',
};

const CreateNewProject = () => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const openFormHandler = () => {
		setIsFormOpen(prevState => !prevState);
	};

	const formik = useFormik({
		initialValues: {
			projectName: '',
		},
		validationSchema: Yup.object({
			projectName: Yup.string().min(4, 'Project name must have atleast 4 characters!').required('This field is required!'),
		}),
		onSubmit: values => {
			console.log(values.projectName);
		},
	});

	const formContent = (
		<div
			className={classes.popupOverlay}
			onClick={() => {
				setIsFormOpen(prevState => !prevState);
			}}>
			<div className={classes.popupCard} onClick={e => e.stopPropagation()}>
				<h1 className={classes.text}>Name your project</h1>
				<form onSubmit={formik.handleSubmit}>
					<input
						type='text'
						id='projectName'
						name='projectName'
						className={`${classes.input} ${formik.touched.projectName && formik.errors.projectName && 'outline outline-1 !outline-red-400'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.projectName}
					/>
					{formik.touched.projectName && formik.errors.projectName ? <p className={classes.error}>{formik.errors.projectName}</p> : null}
					<button className={classes.button}>Create</button>
				</form>
			</div>
		</div>
	);

	return (
		<>
			{isFormOpen && formContent}
			<button onClick={openFormHandler} className={classes.createButton}>
				Create project
			</button>
		</>
	);
};

export default CreateNewProject;
