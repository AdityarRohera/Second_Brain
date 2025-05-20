import express , {Request , Response} from 'express'
import cors from 'cors';
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

// MiddleWares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Database import here
import dbConnect from './database/dbConnect';
dbConnect();

// All Routes here 
import userRouter from './routes/userRoute';

app.use('/api/v1/user' , userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})