import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useParams, NavLink } from 'react-router-dom';
import { UserAuth } from '../../store/authContext';

const classes = {
	sidebar: 'h-screen fixed rounded-r-xl w-56 py-8',
	nav: 'py-12 px-4 w-full h-full bg-[#1a1c1e] rounded-r-2xl',
	list: 'flex flex-col gap-6 items-center justify-center',
	listItem: 'w-full h-auto flex items-center justify-center p-3 bg-[#202123] hover:bg-[#26282a] rounded-md self-center cursor-pointer',
	listItemActive: 'w-full h-auto flex items-center justify-center p-3 bg-[#2D2F30] rounded-md self-center cursor-pointer',
	listContainer: 'w-full h-auto flex items-center justify-start gap-2 text-[#85888d] font-medium text-lg',
};

const NavbarDesktop = () => {
	//TODO: MAKE IT AS NAV LINK bg-[#303234]
	const { projectId } = useParams();
	const { logout } = UserAuth();


	console.log(projectId);

	const logoutHandler = () => logout()

	return (
		<div className={classes.sidebar}>
			<nav className={classes.nav}>
				<ul className={classes.list}>
					<div className='w-full mb-5 flex flex-col gap-4'>
					<li className='w-full'>
						<NavLink to='/' className={`${classes.listItem} !bg-indigo-400 hover:!bg-indigo-500`}>
							<div className={`${classes.listContainer} !text-indigo-900`}>
								<HomeRoundedIcon sx={{ fontSize: 26 }} />
								Home
							</div>
						</NavLink>
					</li>
					<li className='w-full' onClick={logoutHandler}>
						<button className={`${classes.listItem}`} >
							<div className={`${classes.listContainer}`}>
								<LogoutRoundedIcon sx={{ fontSize: 26 }} />
								Logout
							</div>
						</button>
					</li>
					</div>
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
