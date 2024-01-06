
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import loginpage
import LoginPage from "./Pages/UserAuth/LoginPage"



function App() {
  

  return (
    <>
     <Router>
      <Routes>
    {/* /loginpage/ */}
      <Route path="/login" element={<LoginPage />} />

      {/* 404 page */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
