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
const corosoption={
    origin:'*'
}
app.use(cors(corosoption));
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.send('Hello world')
})
/*user route*/
app.use("/api/auth", userRouter);
/*user route*/

/*book route*/
app.use("/api/books", bookRouter);
connectToDb()

app.listen(PORT||8080)

