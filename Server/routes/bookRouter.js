import express from "express";
import { AddBook, getUserBooks, deleteBook, handleSearch,
       editBookDetails, 
     updateBookDetails, getOtherUserBook } from 
     '../controller/bookController/bookController.js'
import { userUnPublishdBook,userPublishdBook } from "../controller/bookController/bookPublishController.js";


     import { protect } from "../middleware/protection.js";

const bookRouer = express.Router();


/*Add new publish Book*/

bookRouer.post('/publish',protect,AddBook)

/*search book*/
bookRouer.post('/search',protect,handleSearch)

/*unpublished book*/
bookRouer.put('/unpublish/:id',protect,userUnPublishdBook)

/*published book*/
bookRouer.put('/published/:id',protect,userPublishdBook)

/*current user books*/

bookRouer.get('/user/:id',protect,getUserBooks)


/* other users books*/

bookRouer.get('/other_users/:id',protect,getOtherUserBook)

export default bookRouer

