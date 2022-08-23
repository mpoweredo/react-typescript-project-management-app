import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import SignInUpRoute from './components/protectedRoutes/SignInUpRoute';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
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
				<Route
					path='/:projectId'
					element={
						<ProtectedRoute>
							<ProjectContextProvider>
								<Dashboard />
							</ProjectContextProvider>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
