import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { FormikValues, useFormik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { ProjectData } from '../../../store/projectContext';

const classes = {
	addNewTask: 'bg-[#11111388] hover:bg-[#232325] text-slate-50 w-8 h-8 rounded-sm font-medium cursor-pointer',
	input: 'bg-[#212428] w-36 h-8 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300',
	createButton: 'bg-[#11111388] hover:bg-[#232325] text-slate-50 w-8 h-8 rounded-sm font-medium cursor-pointer',
};

const NewColumn = () => {
	const { addNewColumn } = ProjectData();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const titleRef = useRef(null);

	const formik = useFormik({
		initialValues: {
			columnTitle: ''
		},
		validationSchema: Yup.object({
			columnTitle: Yup.string().min(4, 'Title name must have atleast 4 characters!').required(),
		}),
		onSubmit: (values, { resetForm }: FormikValues) => {
			addNewColumn(values.columnTitle);
			toggleInput();
			resetForm({ columnTitle: ''}) ;
		},
	});

	const toggleInput = () => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<div className='flex gap-2 pt-2'>
			{isOpen && (
				<form onSubmit={formik.handleSubmit} className='flex gap-2'>
					<input
						type='text'
						id='columnTitle'
						name='columnTitle'
						autoComplete='off'
						className={`${classes.input} ${formik.touched.columnTitle && formik.errors.columnTitle && 'outline outline-1 !outline-red-400'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.columnTitle}
						ref={titleRef}
						autoFocus
					/>
					<button className={classes.createButton}>
						<DoneIcon />
					</button>
				</form>
			)}
			<button onClick={toggleInput} className={classes.addNewTask}>
				{!isOpen ? <AddIcon /> : <CloseIcon />}
			</button>
		</div>
	);
};

export default NewColumn;
