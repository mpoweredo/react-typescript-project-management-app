import { Outlet } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const classes = {
	dashboard: 'lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] grid-rows-[48px_minmax(200px,_1fr)] lg:grid-rows-none w-full h-screen overflow-auto no-scroll min-h-0',
	container: 'w-full h-full lg:p-8 flex flex-col max-h-screen min-h-0',
	content: 'flex flex-col w-full h-full bg-[#1B1D1F] lg:rounded-2xl px-4 py-2 md:px-7 md:py-5 min-h-0',
};

const NavbarLayout = () => {
	return (
		<div className={classes.dashboard}>
			<div className='block lg:hidden'>
				<NavbarMobile />
			</div>
			<div className='hidden lg:block'>
				<NavbarDesktop />
			</div>
			<main className={classes.container}>
				<div className={classes.content}>
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default NavbarLayout;
