import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AllBooks = () => {
    const storedUserDataString = localStorage.getItem("userData");
    const [books, setBooks] = useState([]);
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
  return (
    <div className='bg-purple-950 h-screen font-serif text-white'>
       
    <div className='text-center py-10'>
       
        <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12'>Explore Book World!!!!</h1>
        <input type='search' placeholder='search'/>
        <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-10 max-w-5xl gap-8 mx-auto group'>
        {books?.length === 0 ? (
  <h1 className="flex items-center justify-center mx-auto font-extrabold">No books available</h1>
) : (
  books?.map((book) => (
    <div
      key={book.id} // Don't forget to add a unique key to each element in the array
      className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl'
    >
      <img className='h-20 mx-auto w-full' src={`${baseUrl}/${book?.imageUrl}`} alt={book?.bookName} />
      <h4 className='font-bold uppercase text-xl'>{book?.bookName}</h4>
      <p className='text-sm leading-7 my-3 font-light opacity-50'>
        {book?.content}
      </p>
    </div>
  ))
)}
</div>
        
    </div>
   
</div>
  )
}

export default AllBooks
