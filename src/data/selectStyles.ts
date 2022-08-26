import { ContainerProps, OptionProps, SingleValue, SingleValueProps } from 'react-select';

const prioritySelectStyles = {
	option: (provided: OptionProps<{}>, state: OptionProps<{ color: string; isFocused: boolean }>) => ({
		...provided,
		background: state.isFocused ? '#232429' : '#16171A',
		color: state.data.color,
		padding: '14px 10px 14px 10px',
	}),
	container: (provided: ContainerProps<{}>) => ({
		...provided,
		width: 180,
	}),
	singleValue: (provided: SingleValue<{}>, state: SingleValueProps<{ color: string }>) => {
		const color = state.data.color;
		const transition = 'opacity 300ms';

		return { ...provided, color, transition };
	},
};

const columnSelectStyles = {
	option: (provided: OptionProps<{}>, state: OptionProps<{ color: string; isFocused: boolean }>) => ({
		...provided,
		background: state.isFocused ? '#232429' : '#16171A',
		color: '#d1d5db',
		padding: '14px 10px 14px 10px',
	}),
	container: (provided: ContainerProps<{}>) => ({
		...provided,
		width: '',
	}),
    singleValue: (provided: SingleValue<{}>, state: SingleValueProps<{ color: string }>) => {
		const color = '#d1d5db';
		const transition = 'opacity 300ms';

		return { ...provided, color, transition };
	},
};

export { prioritySelectStyles, columnSelectStyles };
