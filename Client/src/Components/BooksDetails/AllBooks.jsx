import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

const AllBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const booksPerPage = 6;

  const offset = currentPage * booksPerPage;
  const currentBooks = books?.slice(offset, offset + booksPerPage);

  const pageCount = Math.ceil(books?.length / booksPerPage);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    const userData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
    if (userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setBooks(response?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axiosInstance.post("/books/search", {
          searchItem: searchValue,
        });
        setSearchResults(response?.data.results);
        setBooks(response?.data?.results || []);
        setCurrentPage(0); // Reset current page when searching
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-purple-950 h-[100%] font-serif text-white">
        <div className="text-center py-10">
          <h1 className="text-4xl w-96 mx-auto leading-normal font-bold mb-12">
            Explore Book World!!!!
          </h1>

          <Link to={'/add_book'}>  <button className="bg-purple-400 rounded-md  hover:bg-white hover:text-purple-400 float-end me-20 mt-10 mx-auto px-5 py-2 ">Add Books</button>
      </Link> 
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-2  justify-center rounded-[5px] ">
              
              <button
                type="submit"
                className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]"
                onClick={fetchData} 
              >
                Show Lists
              </button>
            </div>
          </form>
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 mt-10 max-w-5xl gap-8 mx-auto group">
            {currentBooks?.length === 0 ? (
              <h1 className="flex items-center justify-center mx-auto font-extrabold">
                No books available
              </h1>
            ) : (
              currentBooks?.map((book) => (
                <div
                  key={book?.id}
                  className="bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl"
                >
                  <h3 className="font-bold mt-2 font-mono uppercase text-xl">
                    User Id: {book?.userId}
                  </h3>
                  <h4 className="font-bold mt-2  text-xl">Id: {book?.id}</h4>
                  <p className="text-sm leading-7 my-3 font-light opacity-50">
                    Title: {book?.title}
                  </p>
                  <p className="text-sm leading-7 my-3 font-light opacity-50">
                    Body: {book?.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-center  mx-auto mt-8">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination flex"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default AllBooks;
