
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import loginpage
import LoginPage from "./Pages/UserAuth/LoginPage"

// import signup page
import SignUpPage from "./Pages/UserAuth/SignUp"
import ErrorPage from "./Components/Error/ErrorPage";



function App() {
  

  return (
    <>
     <Router>
      <Routes>
    {/* /loginpage/ */}
      <Route path="/login" element={<LoginPage />} />

      {/* SignUpPage */}
      <Route path="/signup" element={<SignUpPage />} />

      {/* 404 page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
