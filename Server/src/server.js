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

import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const app=express()
const PORT = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corosoption={
    origin:'*'
}
app.use(cors(corosoption));
app.use(morgan('tiny'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname, "../../Client/dist"))); 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../Client/dist/index.html'))
});

/*user route*/
app.use("/api/auth", userRouter);
/*user route*/

/*book route*/
app.use("/api/books", bookRouter);
connectToDb()

app.listen(PORT||8080)

