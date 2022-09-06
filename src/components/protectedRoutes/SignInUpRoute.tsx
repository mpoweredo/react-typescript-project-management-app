import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../store/authContext';
import { CircularProgress } from '@mui/material';

type Props = {
	children?: JSX.Element | JSX.Element[];
};

const SignInUpRoute = ({ children }: Props) => {
	const { user } = UserAuth();

	if (user) {
		return <Navigate to='/' />;
	}

	if (user === null) {
		return (
			<div className='w-full h-full lg:p-8 flex items-center justify-center'>
				<CircularProgress />
			</div>
		);
	}

	if (user === false) {
		return <>{children}</>;
	} else return null;
};

export default SignInUpRoute;
