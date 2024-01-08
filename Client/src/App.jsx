
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import loginpage
import LoginPage from "./Pages/UserAuth/LoginPage"

// import signup page
import SignUpPage from "./Pages/UserAuth/SignUp"
//import 404 page
import ErrorPage from "./Components/Error/ErrorPage";
//import otp page
import Otp from "./Components/UserAuth/Otp";
//import Other users Books
import AllBooksPage from "./Pages/BookDetail/AllBooksPage";
//import my books
import MyBooksPage from "./Pages/BookDetail/MyBooks";
//import Add books
import AddBookPage from "./Pages/BookDetail/AddBook";
//import Edit books
import EditBook from "./Components/BooksDetails/EditBook";



function App() {
  

  return (
    <>
     <Router>
      <Routes>
    {/* /loginpage/ */}
      <Route path="/login" element={<LoginPage />} />

      {/* SignUpPage */}
      <Route path="/signup" element={<SignUpPage />} />

       {/* Otp Page */}
       <Route path="/user_otp" element={<Otp />} />

      {/* 404 page */}
      <Route path="*" element={<ErrorPage />} />

      {/* All Books */}
      <Route path="/" element={<AllBooksPage />} />

      {/* my books */}
      <Route path="/my_book" element={<MyBooksPage />} />


      {/* Add Book */}

      <Route path="/add_book" element={<AddBookPage/>}/>

      {/* Edit book */}
      <Route path="/edit_book/:id" element={<EditBook/>}/>

    </Routes>
    </Router>
    </>
  )
}

export default App
