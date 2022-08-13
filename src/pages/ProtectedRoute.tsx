import { Navigate } from 'react-router-dom';
import { UserAuth } from '../store/authContext';
import { CircularProgress } from '@mui/material';

type Props = {
	children?: JSX.Element | JSX.Element[];
};

const ProtectedRoute = ({ children }: Props) => {
	const { user } = UserAuth();

	console.log(user);

	if (user) {
		return <>{children}</>;
	}

	if (user === null) {
		return (
			<div className='h-screen w-screen flex items-center justify-center text-indigo-600'>
				<CircularProgress />
			</div>
		);
	}

	if (user === false) {
		return <Navigate to='/signin' />;
	} else return null;
};

export default ProtectedRoute;
