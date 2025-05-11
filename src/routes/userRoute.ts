import express , {Router} from 'express';
const userRouter = Router();

// all files import here
import { userSignup , userSignin } from '../controllers/userController';
import { userAuth } from '../middlewares/userAuth';
import { AuthenticatedRequest } from '../middlewares/userAuth';
import { createContent , contentTag } from '../controllers/userController';

// user authentication routes
userRouter.post('/signup' , userSignup );
userRouter.post('/signin' , userSignin );

// middleware here for protect user route
userRouter.use(userAuth);

// all user routes

userRouter.post('/create-content' , createContent);
userRouter.get('/content' , contentTag );


export default userRouter;