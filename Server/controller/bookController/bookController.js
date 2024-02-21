/*import book models*/
import BooksModel from "../../models/bookModel.js";
import  sanitize  from 'mongo-sanitize';


/*Add Books */

const AddBook = async (req, res) => {
    try {
        
       

        const { id, title, userid, imageUrl, userId,body } = req.body

        const userExists = await BooksModel.findOne({ id });
        console.log(userExists);

        
        

        if (userExists ) {
          
            return res.status(409).json({ message: "User already exists" });
        }

        if (!id || !title || !userid || !userId || !body ) {
            return res?.status(400)?.json({ message: "All fields are required" });
        }
        const newPost = new BooksModel({
            id :sanitize(id),
            title:sanitize(title),
            userid:sanitize(userid),
            imageUrl:sanitize(imageUrl),
            body:sanitize(body),

            userId:sanitize(userId)


        })
        await newPost.save()

        if (newPost) {
            return res.status(200).json({ newPost })

        } else {
            return res.status(500).json({ Message: "Some error" })
        }



    } catch (error) {
        console.log(error);
        return res?.status(400)?.json({ Message: "404 error" })

    }
}
/*Add Books */


/*get Books*/

const getUserBooks = async (req, res) => {
    
    try {

        const { id } = req?.params
        console.log(id);
        

        const posts = await BooksModel.find({ userId: id }).populate('userId')
        console.log(posts);
        
        if (posts) {
            
            return res.status(200).json({ posts })

        }

    } catch (error) {
        res?.status(400)?.json(error.message)
        console.log(error);

    }
}

/*get Books*/


/* delete Books*/
const deleteBook = async (req, res) => {
    try {
        const { id } = req?.params
        const userPost = await BooksModel.find({ _id: id })
        if (userPost) {
            await BooksModel.findByIdAndDelete(id)

            res?.status(200).json("POst deleted successfully");

        } else {
            res?.status(500).json({ message: "no Post to display" });
        }

    } catch (error) {
        res?.status(500).json({ error: "Internal Server Error" });

    }
}
/* delete post*/


/*search post*/

const handleSearch = async (req, res, next) => {
    const { searchItem } = req.body;
    console.log(req.body); // Remove optional chaining for required property
  
    try {
      const results = await BooksModel.find({
        $text: { $search: searchItem, $caseSensitive: false }
      });
  
      console.log(results);
  
      res.status(200).json({ results }); // Remove optional chaining for response
  
    } catch (error) {
      res.status(500).json({ status: "failed", message: error.message }); // Remove optional chaining for error
    }
  };



/*search*/



const editBookDetails = async (req, res) => {
    try {
        
        const { id } = req?.params
        const editPost = await BooksModel?.find({ _id: id })
       

        if (editPost) {
            return res?.status(200)?.json({ editPost })

        }

    } catch (error) {

    }
}

/*post edit */


/*update post*/
const updateBookDetails = async (req, res) => {
    try {
        
        
        const { book_id } = req?.params;
        console.log(req.params);
        const { id, title, userid,body } = req?.body;

      
        

        
        

      
        const postFind = await BooksModel?.findById(book_id);
       

        if (postFind) {
            await BooksModel?.findByIdAndUpdate(book_id, {
                id,
                title,
                userid,

                body,
            });

            const updatedPost = await BooksModel?.findById(book_id);
console.log(updatedPost);

            res?.status(200)?.json({ updatedPost });
        } else {
            res?.status(404)?.json({ message: "Note not found" });
        }
    } catch (error) {
        console?.error(error);
        res?.status(500)?.json({ error: "Internal Server Error" });
    }
}

/*update post*/


/*Other users Posts*/
const getOtherUserBook = async (req, res) => {
    try {

  
        

        const posts =  await BooksModel?.find()
        console.log(posts,"lll");
        if (posts) {
            return res?.status(200)?.json({ posts })

        }

    } catch (error) {
        res?.status(400)?.json(error?.message)
        console?.log(error);

    }
}


/*Other users Posts*/


export { AddBook, getUserBooks, deleteBook, handleSearch,  editBookDetails, updateBookDetails,getOtherUserBook }