import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./pages/ProtectedRoute"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Projects from "./pages/projects/Projects"

function App() {

  return (
    <div className="App bg-[#121316] h-screen">
      <Routes>
        <Route path='/' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
