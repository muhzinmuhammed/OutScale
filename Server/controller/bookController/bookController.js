
import BooksModel from "../../models/bookModel.js";
import  sanitize  from 'mongo-sanitize';


/*Add Books */

const AddBook = async (req, res) => {
    try {

        const { bookName, description, content, imageUrl, userId } = req?.body
        if (!bookName || !description || !content || !userId) {
            return res?.status(400)?.json({ message: "All fields are required" });
        }
        const newPost = new BooksModel({
            bookName :sanitize(bookName),
            description:sanitize(description),
            content:sanitize(content),
            imageUrl:sanitize(imageUrl),

            userId:sanitize(userId)


        })
        await newPost?.save()

        if (newPost) {
            return res?.status(200)?.json({ newPost })

        } else {
            return res?.status(500)?.json({ Message: "Some error" })
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

        const posts = await BooksModel?.find({ userId: id })?.populate('userId')
        if (posts) {
            return res?.status(200)?.json({ posts })

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
        const userPost = await BooksModel?.find({ _id: id })
        if (userPost) {
            await BooksModel?.findByIdAndDelete(id)

            res?.status(200)?.json("POst deleted successfully");

        } else {
            res?.status(500)?.json({ message: "no Post to display" });
        }

    } catch (error) {
        res?.status(500)?.json({ error: "Internal Server Error" });

    }
}
/* delete post*/


/*search post*/

const handleSearch = async (req, res, next) => {
    const { searchItem } = req?.body;



    try {
        const results = await BooksModel?.find({ $text: { $search: searchItem } });
        console?.log(results);

        res?.status(200)?.json({ results });

    } catch (error) {
        res?.status(500)?.json({ status: "failed", message: error?.message });
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
        
        const { id } = req?.params;
        const { bookName, description, content } = req?.body;

        const postFind = await BooksModel?.findById(id);

        if (postFind) {
            await BooksModel?.findByIdAndUpdate(id, {
                bookName,
                description,

                content,
            });

            const updatedPost = await BooksModel?.findById(id);

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

        const { id } = req?.params
        

        const posts =  await BooksModel?.find()?.populate('userId');
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