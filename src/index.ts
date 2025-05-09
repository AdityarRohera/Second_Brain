import express , {Request , Response} from 'express'
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

// MiddleWares
app.use(express.json());

// Database import here
import dbConnect from './database/dbConnect';
dbConnect();

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})