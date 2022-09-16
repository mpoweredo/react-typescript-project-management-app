import { generateRandomEmail } from 'helpers/getRandomEmail';
import { UserAuth } from 'store/authContext';

const classes = 'w-full h-11 mt-4 rounded font-semibold bg-green-500 text-green-900 hover:bg-green-400';

const TestAccount = () => {
	const { registerUser } = UserAuth();
	const loginHandler = async () => {
		await registerUser(`${generateRandomEmail()}@test.com`, 'qwerty', 'Test');
	};

	return (
		<button style={{ boxShadow: '0px 0px 24px 2px rgba(74,222,128,0.5)' }} className={classes} onClick={loginHandler}>
			Sign in by using test account
		</button>
	);
};

export default TestAccount;
