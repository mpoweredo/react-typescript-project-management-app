import React from 'react';
import { UserAuth } from '../../store/authContext';

const classes = {
	greetingText: 'text-4xl font-semibold text-white',
	summaryText: 'text-indigo-200 text-lg font-medium mt-1',
};

const Summary = () => {
	const { user } = UserAuth();
	return (
		<div>
			<div>
				<h1 className={classes.greetingText}>
					Hello <span className='font-bold text-indigo-500'>{user && user.name}</span>
				</h1>
				<p className={classes.summaryText}>Here's summary of your project</p>
			</div>
		</div>
	);
};

export default Summary;
