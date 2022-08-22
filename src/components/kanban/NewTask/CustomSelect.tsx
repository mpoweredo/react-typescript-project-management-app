import Select, { ActionMeta, SingleValue, } from 'react-select';
import { Option } from './NewTaskForm';

type Props = {
	options: Option[];
	value: number;
	onChange: (value: Option) => void;
    passedStyles?: {}
};

const customStyles = {
	control: () => ({
		display: 'flex',
		background: '#212428',
		borderRadius: '0.2rem',
		color: '#8c8e92',
	}),
	menuList: () => ({
		padding: 0
	}),
    singleValue: (provided: SingleValue<{}>)=> ({
        ...provided,
        color: 'white'
    })
};

export default ({ onChange, options, passedStyles = {} }: Props) => {
    const styles = {...customStyles, ...passedStyles}

	return (
		<div>
			<Select
				styles={styles}
				defaultValue={options[0]}
				onChange={(option: Option | null, actionMeta: ActionMeta<Option>) => onChange(option as Option)}
				options={options}
                className='mt-2'
			/>
		</div>
	);
};
