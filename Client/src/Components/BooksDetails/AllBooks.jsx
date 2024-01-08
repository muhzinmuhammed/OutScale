import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
const AllBooks = () => {
    const storedUserDataString = localStorage.getItem("userData");
   const navigate=useNavigate()
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 6;

  const offset = currentPage * booksPerPage;
  const currentBooks = books?.slice(offset, offset + booksPerPage);

  const pageCount = Math.ceil(books?.length / booksPerPage);
  useEffect(() => {
    const userData = localStorage?.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
      const baseUrl =
      "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
      useEffect(() => {
        // Fetch data from your API using Axios
        axiosInstance
          .get(`/books/other_users/${storedUserData?._id}`)
          .then((response) => {
            console.log(response.data);
            setBooks(response?.data?.posts);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }, []);
       /* search book*/
  const handleSearch = async (e) => {
    console.log("kkkkkkkkkkk");
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axiosInstance.post('/books/search', {
          searchItem: searchValue,
        });

        // Update the searchResults state
        setSearchResults(response?.data.results);

        // Update the post state only if there are search results
        setBooks(response?.data?.results || []);

         // Reset current page when searching
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
      
      
  return (
    <>
    <ToastContainer/>
    <div className='bg-purple-950 h-[100%] font-serif text-white'>
       
    <div className='text-center py-10'>
       
        <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12'>Explore Book World!!!!</h1>
        <form onSubmit={handleSearch}>
         <div className="flex items-center gap-2  justify-center rounded-[5px] ">
        <input  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)} type="text" className="bg-[#F8F9FC] text-purple-900 h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal "placeholder="Search" />
        <button type="submit" className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
            <FaSearch  color="white"/>
        </button>
     </div>
         </form>
        <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-10 max-w-5xl gap-8 mx-auto group'>
        {currentBooks?.length === 0 ? (
  <h1 className="flex items-center justify-center mx-auto font-extrabold">No books available</h1>
) : (
  currentBooks?.map((book) => (
    <div
      key={book?.id} // Don't forget to add a unique key to each element in the array
      className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl'
    >
      <img className='h-20 mx-auto w-full' src={`${baseUrl}/${book?.imageUrl}`} alt={book?.bookName} />
         <h3 className='font-bold mt-2 font-mono uppercase text-xl'>{book?.userId?.username}</h3>
      <h4 className='font-bold mt-2 uppercase text-xl'>{book?.bookName}</h4>
      <p className='text-sm leading-7 my-3 font-light opacity-50'>
        {book?.bookPrice}
      </p>
    </div>
  ))
)}
</div>
        
    </div>
    <div  className="flex items-center justify-center  mx-auto mt-8">
        
<ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination flex'}
          activeClassName={'active'}
        />

</div>
   
</div>
    </>
  )
}

export default AllBooks
