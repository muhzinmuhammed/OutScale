import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import "dotenv/config";
//  mongodb connection
import connectToDb from '../Connection/config.js';

/*import user router*/
import userRouter from "../routes/userRouter.js";

/*import book router*/
import bookRouter from "../routes/bookRouter.js";


const app=express()
const PORT = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));


/*user route*/
app.use("/api/auth", userRouter);
/*user route*/

/*book route*/
app.use("/api/books", bookRouter);
connectToDb()

app.listen(PORT||8080)

