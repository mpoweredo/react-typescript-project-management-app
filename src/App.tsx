import { Route, Routes } from 'react-router-dom';
import NavbarDesktop from './components/layout/NavbarDesktop';
import NavbarMobile from './components/layout/NavbarMobile';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import SignInUpRoute from './components/protectedRoutes/SignInUpRoute';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Kanban from './pages/kanban/kanban';
import Projects from './pages/projects/Projects';
import { ProjectContextProvider } from './store/projectContext';

const classes = {
	dashboard: 'lg:grid lg:grid-cols-[224px_minmax(700px,_1fr)] w-full lg:min-h-screen',
};

function App() {
	return (
		<div className='App bg-[#121316] min-h-screen'>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Projects />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signin'
					element={
						<SignInUpRoute>
							<SignIn />
						</SignInUpRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<SignInUpRoute>
							<SignUp />
						</SignInUpRoute>
					}
				/>
			</Routes>
			<div className={classes.dashboard}>
				<div className='block lg:hidden'>
					<NavbarMobile />
				</div>
				<div className='hidden lg:block'>
					<NavbarDesktop />
				</div>
				<Routes>
					<Route
						path='/:projectId/kanban'
						element={
							<ProtectedRoute>
								<ProjectContextProvider>
									<Kanban />
								</ProjectContextProvider>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
