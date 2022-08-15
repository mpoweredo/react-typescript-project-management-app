const classes = {
	card: 'w-[240px] h-[200px] rounded-lg shadow-md p-3 bg-[#181a1d] hover:bg-[#292c31] duration-300 flex items-center cursor-pointer justify-center break-all text-center',
};

type Props = { 
    name: string
}

const ProjectItem = ({ name }: Props) => {
	return (
		<div className={classes.card}>
			<h1 className="text-2xl text-[#757779]">{name}</h1>
		</div>
	);
};

export default ProjectItem;
