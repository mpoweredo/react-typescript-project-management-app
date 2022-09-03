import { Route, Routes } from 'react-router-dom';
import NavbarLayout from './components/layout/NavbarLayout';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import SignInUpRoute from './components/protectedRoutes/SignInUpRoute';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Kanban from './pages/kanban/kanban';
import Projects from './pages/projects/Projects';
import { ProjectContextProvider } from './store/projectContext';

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
				<Route element={<NavbarLayout />}>
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
				</Route>
			</Routes>
		</div>
	);
}

export default App;
