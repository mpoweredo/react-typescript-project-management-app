import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const classes = {
	card: 'relative w-[240px] h-[200px] rounded-lg shadow-md p-3 bg-[#181a1d] hover:bg-[#292c31] duration-300 flex items-center cursor-pointer justify-center break-all text-center',
	buttonDelete:
		'w-8 h-8 ml-2 rounded font-semibold justify-start bg-[#151619] text-red-400 hover:bg-[#1d1f24] absolute top-[5%] right-[5%] p-2 flex items-center justify-center z-20',
};

type Props = {
	name: string;
	id: string;
	deleteProject: (id: string) => void;
};

const ProjectItem = ({ name, id, deleteProject }: Props) => {
	const navigate = useNavigate();

	const navigateToProject = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		navigate(`/${id}/kanban`);
	};

	const deleteProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		deleteProject(id);
	};

	return (
		<div className={classes.card} onClick={navigateToProject}>
			<button className={classes.buttonDelete} onClick={deleteProjectHandler}>
				<DeleteIcon />
			</button>

			<h1 className='text-2xl text-[#757779]'>{name}</h1>
		</div>
	);
};

export default ProjectItem;
