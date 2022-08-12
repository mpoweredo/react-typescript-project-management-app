import { Navigate } from 'react-router-dom'
import { UserAuth } from '../store/authContext'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = UserAuth()

  console.log(user)

  if (user) {
    return <>
      {children}
    </>
  }

  if (user === null) {
    // TODO: LOADING SPINNER
    return <h1 className='text-white text-5xl'>waiting</h1>
  }

  if (user === false) {
    return <Navigate to='/signin' />
  } else return null

}

export default ProtectedRoute