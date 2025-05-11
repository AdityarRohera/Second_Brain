import { Request , Response , RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const secret : string|undefined = process.env.JWT_SECRET;
const saltRounds = 10;

// all files import
import userModel from "../Models/userModel";
import tagModel from "../Models/tagsModel";
import contentModel from "../Models/contentModel";
import { AuthenticatedRequest } from "../middlewares/userAuth";

export const userSignup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, password } = req.body;

        //  Basic validation
        if (!userName || !password) {
            res.status(400).send({
                status: "fail",
                message: "Username and password are required",
            });
            return;
        }

        const findUser = await userModel.findOne({ userName });
        if (findUser) {
            res.status(403).send({
                status: "fail",
                message: "User already exists with this username",
            });
            return; // stop further execution
        }

        //  Hash password (no need for extra check)
        const hashPassword = await bcrypt.hash(password, saltRounds);

        //  Create new user
        await userModel.create({ userName, password: hashPassword });

        res.status(200).send({
            status: "success",
            message: "User registered successfully",
        });

    } catch (err: unknown) {
        let errorMessage;

        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === "string") {
            errorMessage = err;
        }

        res.status(500).send({
            status: "fail",
            message: errorMessage,
        });
    }
}

export const userSignin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, password } = req.body;

         //  Basic validation
        if (!userName || !password) {
            res.status(400).send({
                status: "fail",
                message: "Username and password are required",
            });
            return;
        }

        const checkUser = await userModel.findOne({ userName });

        if (!checkUser) {
            res.status(403).send({
                status: "fail",
                message: "email incorrect",
            });
            return;
        }

        // Check password
        const comparePassword = await bcrypt.compare(password, checkUser.password);

        if (!comparePassword) {
            res.status(403).send({
                status: "fail",
                message: "password incorrect",
            });
            return;
        }

        // Generate token
        const userId = checkUser._id;
        let token;
        if(typeof(secret) === 'string'){
            token = jwt.sign({
            userId : userId
        } , secret)
        }

        if(token){
            res.status(200).send({
            status: "success",
            message: "user login successfully",
            token: token,
          });
        }

    } catch (err) {
        let errorMessage;

        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === "string") {
            errorMessage = err;
        }

        res.status(501).send({
            status: "fail",
            message: "Something wrong in signin",
            error: errorMessage,
        });
    }
};

export const createContent : RequestHandler = async (req: Request , res: Response): Promise<void> => {
    try{
         const userReq = req as AuthenticatedRequest;
        const {userId} = userReq
        const {contentType , link , title , tags} = req.body;
        
        console.log(tags);



        // create user content
        const createContent = await (await contentModel.create({contentType , link , title , tags , userId})).populate("tags" , "tag");

        // console.log(createContent);

        res.status(200).send({
            message : "content created",
            content : createContent
        })

    } catch(err : unknown){
        let errorMessage;
        if(err instanceof Error){
            errorMessage = err.message;
        } else if(typeof(err) === 'string'){
            errorMessage = err;
        }

        res.status(500).send({
            status : "fail",
            message : errorMessage
        })
    }
}

export const contentTag : RequestHandler = async (req: Request , res: Response) : Promise<void> => {
    try{
        const {tag} = req.body;
        let contentTag = await tagModel.findOne({tag})

        if(!contentTag) contentTag = await tagModel.create({tag})
        
        res.status(200).send({
            message : "tag added",
            tag_id : contentTag._id
        })
        
    } catch(err : unknown){
        let errorMessage;
        if(err instanceof Error){
            errorMessage = err.message;
        } else if(typeof(err) === 'string'){
            errorMessage = err;
        }

        res.status(500).send({
            status : "fail",
            message : errorMessage
        })
    }
}