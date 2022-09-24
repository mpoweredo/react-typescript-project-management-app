import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { UserAuth } from 'store/authContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Backdrop from 'UI/Backdrop';

const classes = {
	header: 'h-12 bg-[#25282b] w-full flex items-center justify-end px-5',
	navbar: 'h-full w-[280px] ml-auto bg-[#191a1b] flex flex-col px-5',
	buttonContainer: 'mt-2 justify-self-end self-end bg-[#3c4044] p-1 rounded-sm cursor-pointer',
	listContainer: 'flex flex-col gap-5 pt-20 items-center justify-center',
	listItem: 'w-full h-auto flex items-center justify-center p-3 bg-[#202123] hover:bg-[#26282a] rounded-md self-center cursor-pointer',
	listItemActive: 'w-full h-auto flex items-center justify-center p-3 bg-[#2D2F30] rounded-md self-center cursor-pointer',
	listItemContainer: 'w-full h-auto flex items-center justify-start gap-2 text-[#85888d] font-medium text-lg',
	buttonClose: 'bg-[#3c4044] p-1 rounded-sm cursor-pointer',
};

const NavbarMobile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = UserAuth();
	const { projectId } = useParams();

	const logoutHandler = () => logout();

	const toggleHandler = () => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<header className={classes.header}>
			<button className={classes.buttonClose} onClick={toggleHandler}>
				<MenuRoundedIcon sx={{ color: 'white', fontSize: '1.75rem' }} />
			</button>
			{isOpen && (
				<Backdrop passedCloseHandler={toggleHandler}>
					<nav className={classes.navbar} onClick={e => e.stopPropagation()}>
						<div className={classes.buttonContainer}>
							<button onClick={toggleHandler}>
								<CloseRoundedIcon sx={{ color: 'white', fontSize: '1.75rem' }} />
							</button>
						</div>
						<ul className={classes.listContainer}>
							<li className='w-full'>
								<NavLink to='/' className={`${classes.listItem} !bg-indigo-400 hover:!bg-indigo-500`}>
									<div className={`${classes.listItemContainer} !text-indigo-900`}>
										<HomeRoundedIcon sx={{ fontSize: 26 }} />
										Home
									</div>
								</NavLink>
							</li>
							<li className='w-full'>
								<NavLink to={`/${projectId}/summary`} className={navData => (navData.isActive ? classes.listItemActive : classes.listItem)}>
									<div className={classes.listItemContainer}>
										<ShowChartIcon sx={{ fontSize: 26 }} />
										Summary
									</div>
								</NavLink>
							</li>
							<li className='w-full'>
								<NavLink to={`/${projectId}/kanban`} className={navData => (navData.isActive ? classes.listItemActive : classes.listItem)}>
									<div className={classes.listItemContainer}>
										<ViewKanbanIcon sx={{ fontSize: 26 }} />
										Kanban
									</div>
								</NavLink>
							</li>
							<li className='w-full'>
								<NavLink to={`/${projectId}/calendar`} className={navData => (navData.isActive ? classes.listItemActive : classes.listItem)}>
									<div className={classes.listItemContainer}>
										<CalendarMonthIcon sx={{ fontSize: 26 }} />
										Calendar
									</div>
								</NavLink>
							</li>
							<li className='w-full' onClick={logoutHandler}>
								<button className={`${classes.listItem}`}>
									<div className={`${classes.listItemContainer}`}>
										<LogoutRoundedIcon sx={{ fontSize: 26 }} />
										Logout
									</div>
								</button>
							</li>
						</ul>
					</nav>
				</Backdrop>
			)}
		</header>
	);
};

export default NavbarMobile;
