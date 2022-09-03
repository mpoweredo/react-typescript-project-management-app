import { Outlet } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const classes = {
	dashboard: 'lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full lg:min-h-screen',
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
			<Outlet />
		</div>
	);
};

export default NavbarLayout;
