import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../store/authContext';
import { CircularProgress } from '@mui/material';

type Props = {
	children?: JSX.Element | JSX.Element[];
};

const ProtectedRoute = ({ children }: Props) => {
	const { user } = UserAuth();

	if (user) {
		return <>{children}</>;
	}

	if (user === null) {
		return (
			<div className='w-full h-full lg:p-8 flex items-center justify-center'>
				<CircularProgress />
			</div>
		);
	}

	if (user === false) {
		return <Navigate to='/signin' />;
	} else return null;
};

export default ProtectedRoute;
