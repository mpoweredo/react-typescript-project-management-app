import Select, { ActionMeta, SingleValue } from 'react-select';
import { ProjectData } from '../../../store/projectContext';
import { Option } from '../../../types/KanbanTypes';

type Props = {
	options: Option[];
	onChange: (value: Option) => void;
	passedStyles?: {};
	PassedDefaultValue?: Option
};

const customStyles = {
	control: () => ({
		display: 'flex',
		background: '#212428',
		borderRadius: '0.2rem',
		color: '#8c8e92',
	}),
	menuList: () => ({
		padding: 0,
	}),
	singleValue: (provided: SingleValue<{}>) => ({
		...provided,
		color: 'white',
	}),
};

export default ({ onChange, options, passedStyles = {}, PassedDefaultValue}: Props) => {
	const { project } = ProjectData();

	const styles = { ...customStyles, ...passedStyles };

	return (
		<div>
			<Select
				styles={styles}
				defaultValue={PassedDefaultValue || options[0]}
				onChange={(option: Option | null) => onChange(option as Option)}
				options={options}
				className='mt-2'
				menuPosition='fixed'
				menuPlacement={project && project?.kanban.length > 5 ? 'top' : 'bottom'}
			/>
		</div>
	);
};
