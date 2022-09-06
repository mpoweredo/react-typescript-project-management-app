const classes = {
	day: 'w-full h-full text-slate-100 text-center font-semibold',
};

const Days = () => {
	return (
		<>
			<div className={classes.day}>Mo</div>
			<div className={classes.day}>Tu</div>
			<div className={classes.day}>We</div>
			<div className={classes.day}>Th</div>
			<div className={classes.day}>Fr</div>
			<div className={classes.day}>Sa</div>
			<div className={classes.day}>Su</div>
		</>
	);
};

export default Days;
