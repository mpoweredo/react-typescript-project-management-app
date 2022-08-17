import { useNavigate } from "react-router-dom";

const classes = {
	card: 'w-[240px] h-[200px] rounded-lg shadow-md p-3 bg-[#181a1d] hover:bg-[#292c31] duration-300 flex items-center cursor-pointer justify-center break-all text-center',
};

type Props = { 
    name: string
	id: string
}

const ProjectItem = ({ name, id }: Props) => {
	const navigate = useNavigate()

	const navigateToProject = () => {
		navigate(`/${id}`)
	}

	return (
		<div className={classes.card} onClick={navigateToProject} >
			<h1 className="text-2xl text-[#757779]">{name}</h1>
		</div>
	);
};

export default ProjectItem;
