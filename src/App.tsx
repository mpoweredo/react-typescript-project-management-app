import { Route, Routes } from "react-router-dom"
import Kanban from "./pages/Kanban"
import ProtectedRoute from "./pages/ProtectedRoute"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <div className="App bg-[#121316] h-screen">
      <Routes>
        <Route path='/' element={<ProtectedRoute><Kanban /></ProtectedRoute>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
