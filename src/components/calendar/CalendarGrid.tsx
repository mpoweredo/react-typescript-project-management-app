import React from 'react';

const classes = {
	day: 'w-full h-full bg-[#212325] text-slate-100 text-center',
};

const CalendarGrid = () => {
	return (
		<div className='w-3/5 h-full '>
			<div className='flex justify-between'>
				<h1 className='text-white'>January</h1>
                <div className='flex gap-3 text-pink-300'>
                    <button>left</button>
                    <button>right</button>
                </div>
			</div>
			<div className='grid grid-cols-7 '>
				<div className={classes.day}>M</div>
				<div className={classes.day}>T</div>
				<div className={classes.day}>W</div>
				<div className={classes.day}>T</div>
				<div className={classes.day}>F</div>
				<div className={classes.day}>S</div>
				<div className={classes.day}>S</div>
			</div>
		</div>
	);
};

export default CalendarGrid;
