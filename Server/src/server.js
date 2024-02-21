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

// import { fileURLToPath } from 'url';
// import path,{ dirname } from 'path';

const app=express();
const PORT = process.env.PORT

app.use(express.json());
// const corosoption={
//     origin:[' ']
// }
// Enable CORS for all routes
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

connectToDb()
app.use(cors());
app.use(morgan('tiny'));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


/*user route*/
app.use("/api/auth", userRouter);
/*user route*/

/*book route*/
app.use("/api/books", bookRouter);

// app.use(express.static(path.join(__dirname, "../../Client/dist"))); 
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../../Client/dist/index.html'))
// });


app.listen(PORT||8080)

