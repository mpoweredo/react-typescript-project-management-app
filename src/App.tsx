import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import SignInUpRoute from './components/protectedRoutes/SignInUpRoute';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Projects from './pages/projects/Projects';

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
        <Route path='/:id' element={<ProtectedRoute></ProtectedRoute>} />
			</Routes>
		</div>
	);
}

export default App;
