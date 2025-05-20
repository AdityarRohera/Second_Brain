import express , {Router} from 'express';
const userRouter = Router();

// all files import here
import { userSignup , userSignin, updateContent } from '../controllers/userController';
import { userAuth } from '../middlewares/userAuth';
import { AuthenticatedRequest } from '../middlewares/userAuth';
import { createContent , contentTag , getContent , getTag } from '../controllers/userController';

// user authentication routes
userRouter.post('/signup' , userSignup );
userRouter.post('/signin' , userSignin );

// middleware here for protect user route
// userRouter.use(userAuth);

// all user routes

userRouter.post('/create-content', userAuth, createContent);
userRouter.get('/content' , userAuth , getContent );
userRouter.put('/update-content' , userAuth , updateContent);
userRouter.post('/create-tag' , contentTag);
userRouter.get('/get-tags' , getTag);

export default userRouter;