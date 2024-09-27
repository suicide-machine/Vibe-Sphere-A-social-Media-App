import { Route, Routes } from "react-router-dom"
import SigninForm from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import Home from "./root/pages/Home"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />

        {/* private routes */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
