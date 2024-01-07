import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoBookmarkSlashFill } from "react-icons/go";
import { FaBookmark, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const MyBooks = () => {
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
          .get(`/books/user/${storedUserData?._id}`)
          .then((response) => {
            setBooks(response?.data?.posts);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }, []);

/*un publush book*/
      

      const handleUnPublish = async (id) => {
        


        try {
            // Show a confirmation sweet alert
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Do You want to unPublish this Book",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            });
      
            // If the user clicks the confirm button
            if (result.isConfirmed) {
              // Make the delete request
              await axiosInstance.put(`/books/unpublish/${id}`);
      
              // Show a success sweet alert
              Swal.fire("Unpublished Book.", "success");
      
              // Reload the page
              setTimeout(() => {
                window.location.reload();
                
              }, 1000);
            }
          } catch (error) {
            // Show an error sweet alert
            Swal.fire("Error!", error?.message || "An error occurred.", "error");
          }
      };
      /*un publush book*/

      /* publush book*/
    
      const handlePublish = async (id) => {
        try {
            // Show a confirmation sweet alert
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Do You want to Publish this Book",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Published Book !",
            });
      
            // If the user clicks the confirm button
            if (result.isConfirmed) {
              // Make the delete request
              await axiosInstance.put(`/books/published/${id}`);
      
              // Show a success sweet alert
              Swal.fire("Unpublished Book.", "success");
      
              // Reload the page
           
                window.location.reload();
                
            
            }
          } catch (error) {
            // Show an error sweet alert
            Swal.fire("Error!", error?.message || "An error occurred.", "error");
          }
      };
      
       /* publush book*/
    return (
     <>
     <ToastContainer/>
      <div className='bg-purple-950 h-screen font-serif text-white'>
      <Link to={'/add_book'}>  <button className="bg-purple-400 rounded-md  hover:bg-white hover:text-purple-400 float-end me-20 mt-10 mx-auto px-5 py-2 ">Add Books</button>
      </Link> 
      <div className='text-center py-10'>
          
          <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12'>Collections Of My Books</h1>
          <input type='search' placeholder='search'/>
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-10 max-w-5xl gap-8 mx-auto group'>
          {books?.length === 0 ? (
  <h1 className="flex items-center justify-center mx-auto font-extrabold">No books available</h1>
) : (
  books?.map((book) => (
    <div
      key={book.id} // Don't forget to add a unique key to each element in the array
      className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl '
    >
      <img className='h-20 mx-auto w-full' src={`${baseUrl}/${book?.imageUrl}`} alt={book?.bookName} />
      <h4 className='font-bold uppercase text-xl'>{book?.bookName}</h4>
      <p className='text-sm leading-7 my-3 font-light opacity-50'>
        {book?.content}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button className='gap-2 py-2.5 px-8 rounded-full'><FaEdit size={30} /></button>
        {
          book?.status === true ? 
            <button onClick={() => handleUnPublish(book?._id)} className='gap-x-2 py-2.5 px-8 rounded-full'><FaBookmark size={30} /></button> :
            <button onClick={() => handlePublish(book?._id)} className='gap-x-2 py-2.5 px-8 rounded-full'><GoBookmarkSlashFill size={30} /></button>
        }
      </div>
    </div>
  ))
)}

</div>
          
      </div>
     
  </div>
     </>
    )
  }
  
  export default MyBooks
  