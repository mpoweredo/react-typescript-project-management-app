import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams, NavLink } from 'react-router-dom';

const classes = {
	sidebar: 'h-screen fixed rounded-r-xl w-56 py-8',
	nav: 'py-12 px-4 w-full h-full bg-[#1a1c1e] rounded-r-2xl',
	list: 'flex flex-col gap-6 items-center justify-center',
	listItem: 'w-full h-auto flex items-center justify-center p-3 bg-[#202123] rounded-md self-center cursor-pointer',
	listItemActive: 'w-full h-auto flex items-center justify-center p-3 bg-[#2D2F30] rounded-md self-center cursor-pointer',
	listContainer: 'w-full h-auto flex items-center justify-start gap-2 text-[#85888d] font-medium text-lg',
};

const NavbarDesktop = () => {
	//TODO: MAKE IT AS NAV LINK bg-[#303234]
	const { projectId } = useParams();

	console.log(projectId);

	return (
		<div className={classes.sidebar}>
			<nav className={classes.nav}>
				<ul className={classes.list}>
					<li className='w-full'>
						<NavLink to={`/${projectId}/kanban`} className={navData => (navData.isActive ? classes.listItemActive : classes.listItem)}>
							<div className={classes.listContainer}>
								<ViewKanbanIcon sx={{ fontSize: 26 }} />
								Kanban
							</div>
						</NavLink>
					</li>
					<li className='w-full'>
						<NavLink to={`/${projectId}/calendar`} className={navData => (navData.isActive ? classes.listItemActive : classes.listItem)}>
							<div className={classes.listContainer}>
								<CalendarMonthIcon sx={{ fontSize: 26 }} />
								Calendar
							</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavbarDesktop;
