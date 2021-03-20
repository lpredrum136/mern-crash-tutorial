import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const Auth = ({ authRoute }) => (
	<div className='landing'>
		<div className='dark-overlay'>
			<div className='landing-inner'>
				<h1>LearnIt</h1>
				<h4>Keep track of what you are learning</h4>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</div>
		</div>
	</div>
)

export default Auth
