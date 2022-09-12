import { useState, useEffect } from 'react';
import { PieChart as Chart, Pie, Cell, Sector } from 'recharts';
import { calculateColumnsItems } from '../../helpers/calculateColumnItems';
import { ProjectData } from '../../store/projectContext';
import { ChartData } from '../../types/ChartTypes';

const PieChart = () => {
	const [chartData, setChartData] = useState<ChartData>([]);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [didAnimationEnded, setDidAnimationEnded] = useState<boolean>(false);
	const { project } = ProjectData();

	useEffect(() => {
		if (project) {
			const data = calculateColumnsItems(project);
			setChartData(data);
		}
	}, [project]);

	const shapepl = ({ cx, cy, fill, percent, innerRadius, outerRadius, startAngle, endAngle }: any) => {
		const completePercent = percent * 100;

		return (
			<g >
				{didAnimationEnded && <text className={`font-extrabold text-xl`} x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
					{completePercent.toFixed()}%
				</text>}
				<Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
			</g>
		);
	};

	const onPieEnter = (_: any, index: number) => {
		setActiveIndex(index);
	};

	const onAnimationEndHandler = () => setDidAnimationEnded(true);

	return (
		<div className='h-full w-full flex gap-10 items-center'>
			<div>
				<Chart width={160} height={160}>
					<Pie
						onAnimationEnd={onAnimationEndHandler}
						activeIndex={activeIndex}
						activeShape={shapepl}
						stroke='none'
						data={chartData}
						innerRadius={40}
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
						onMouseEnter={onPieEnter}>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</Chart>
			</div>
			<div className='h-full flex w-full'>
				{didAnimationEnded && <ul className='h-full w-full flex flex-col gap-5'>
					{chartData.map((item, index) => (
						<li key={`item-${index}`} className='flex gap-3 items-center w-full'>
							<div className='w-5 h-5 rounded-sm' style={{ backgroundColor: item.color }}></div>
							<div className='flex items-center justify-between w-full'>
								<p className='text-gray-50 font-semibold text-lg'>{item.title}</p>
								<p className='text-indigo-300 font-semibold text-lg'>{item.value}</p>
							</div>
						</li>
					))}
				</ul>}
			</div>
		</div>
	);
};

export default PieChart;
