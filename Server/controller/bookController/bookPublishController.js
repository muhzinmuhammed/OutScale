import express from 'express'
import BooksModel from '../../models/bookModel.js'


/*Book unpublish*/ 
const userUnPublishdBook = async (req, res) => {
    try {

        const { id } = req.params;

        const postFind = await BooksModel.findById(id);

        if (postFind) {
            const updatedFind = await BooksModel.findByIdAndUpdate(
                id,
                { status: false },
                { new: true }
            );

            res.status(200).json({ updatedFind });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


/*Book unpublish*/ 




/*Book publish*/ 

const userPublishdBook = async (req, res) => {
    try {

        const { id } = req.params;

        const postFind = await BooksModel.findById(id);

        if (postFind) {
            const updatedFind = await BooksModel.findByIdAndUpdate(
                id,
                { status: true },
                { new: true }
            );

            res.status(200).json({ updatedFind });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*Book publish*/ 

export {userPublishdBook,userUnPublishdBook}