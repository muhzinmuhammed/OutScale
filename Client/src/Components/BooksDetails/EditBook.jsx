import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import axios from "axios";

const EditBook = () => {
    const {id}=useParams()
    const [bookName,setBookName]=useState()
    const [description,setDescription]=useState()
    const [content,setContent]=useState()
    const [price,setPrice]=useState(0)
    const storedUserDataString = localStorage.getItem("userData");

    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
  
      const navigate=useNavigate()

      useEffect(() => {
        const getData = async (id) => {
          try {
            const res = await axiosInstance.get(`/books/edit_book/${id}`);
            console.log(res.data);
    
            res.data.editPost.forEach((item) => {
              setBookName(item?.bookName || '');
              setDescription(item?.description || '');
              setContent(item?.content || '');
              setPrice(item?.bookPrice || '');
            });
          } catch (error) {
            toast.error('Error fetching data');
          }
        };
    
        getData(id);
      }, [id]);
      const handleSubmit = async (e) => {
        e.preventDefault();

      
    
       
    
        // Send the course data to your server
        axiosInstance
          .patch(`/books/update_book/${id}`, {
            bookName,
            description,
            content,
            userId:storedUserData._id,
            bookPrice:price
            
           
          })
          .then((response) => {

            console.log(response.data);
            
            toast.success("Post update successfully");
            setTimeout(() => {
                navigate("/");
                
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error updatin Book");
          });
    };

  return (
    <>
   <ToastContainer/>
    <div className="flex items-center justify-center w-full  bg-purple-950 h-screen  ">
    <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Book Name
        </label>
        <input value={bookName}  onChange={(e) => setBookName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Enter Book name"/>
      </div>
      <div >
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Description
        </label>
        <textarea value={description}  onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Description"/>
      
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Content
        </label>
        <input value={content}  onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Enter Book Content"/>
      </div>

      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Price
        </label>
        <input value={price}  onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="number" placeholder="Enter Book Price"/>
      </div>

      
      <div className="flex items-center justify-center">
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sumbit
        </button>
       
      </div>
    </form>
    
  </div>
   </>
   
  )
}

export default EditBook
