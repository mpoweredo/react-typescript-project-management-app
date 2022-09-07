import React from 'react';

type Props = {
	children?: React.ReactNode;
	passedCloseHandler?: () => void;
};

const Backdrop = ({ children, passedCloseHandler }: Props) => {
	const closeHandler = () => {
		passedCloseHandler && passedCloseHandler();
	};

	return (
		<div onClick={closeHandler} className={'absolute w-screen h-screen bg-[#00000073] top-0 left-0 z-50 p-4 flex items-center justify-center'}>
			{children}
		</div>
	);
};

export default Backdrop;
