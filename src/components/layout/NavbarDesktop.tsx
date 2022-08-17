import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const classes = {
	sidebar: 'h-screen fixed rounded-r-xl w-56 py-8',
	nav: 'py-12 px-4 w-full h-full bg-[#1a1c1e] rounded-r-2xl',
	list: 'flex flex-col gap-4 items-center justify-center',
	listItem: 'w-full h-auto flex items-center justify-center p-3 bg-[#303234] rounded-md self-center cursor-pointer',
	listContainer: 'w-full h-auto flex items-center justify-start gap-2 text-[#85888d] font-medium text-lg',
};

const NavbarDesktop = () => {

    //TODO: MAKE IT AS NAV LINK

	return (
		<div className={classes.sidebar}>
			<nav className={classes.nav}>
				<ul className={classes.list}>
					<li className={classes.listItem}>
						<div className={classes.listContainer}>
							<ViewKanbanIcon sx={{ fontSize: 26 }} />
							<p>Kanban</p>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavbarDesktop;
