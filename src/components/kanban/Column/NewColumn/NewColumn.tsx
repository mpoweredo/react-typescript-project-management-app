import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Field, Form, Formik, FormikValues, useFormik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { ProjectData } from 'store/projectContext';
import { columnTitleSchema } from 'data/formikValidationSchemas';

const classes = {
	addNewColumn: 'bg-[#11111388] hover:bg-[#232325] text-slate-50 w-8 h-8 rounded-sm font-medium cursor-pointer',
	input: 'bg-[#212428] w-36 h-8 rounded px-3 focus:outline focus:outline-indigo-500 duration-500 hover:bg-[#2d3137] text-gray-300',
	createButton: 'bg-[#11111388] hover:bg-[#232325] text-slate-50 w-8 h-8 rounded-sm font-medium cursor-pointer',
};

const initialValues = {
	columnTitle: '',
};

const NewColumn = () => {
	const { addNewColumn } = ProjectData();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const submitHandler = ({ columnTitle }: { columnTitle: string }) => {
		addNewColumn(columnTitle);
		toggleInputHandler();
	};

	const toggleInputHandler = () => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<div className='flex gap-2 pt-2'>
			{isOpen && (
				<Formik initialValues={initialValues} validationSchema={columnTitleSchema} onSubmit={submitHandler}>
					{({ touched, errors }) => (
						<Form className='flex gap-2'>
							<Field
								type='text'
								id='columnTitle'
								name='columnTitle'
								autoComplete='off'
								className={`${classes.input} ${touched.columnTitle && errors.columnTitle && 'outline outline-1 !outline-red-400'}`}
								autoFocus
							/>
							<button className={classes.createButton} type='submit'>
								<DoneIcon />
							</button>
						</Form>
					)}
				</Formik>
			)}
			<button onClick={toggleInputHandler} className={classes.addNewColumn}>
				{!isOpen ? <AddIcon /> : <CloseIcon />}
			</button>
		</div>
	);
};

export default NewColumn;
