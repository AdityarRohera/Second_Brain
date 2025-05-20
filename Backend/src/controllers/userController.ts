import { Request , Response , RequestHandler, urlencoded } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const secret : string|undefined = process.env.JWT_SECRET;
const saltRounds = 10;
import mongoose , {Schema , Model , Types, ObjectId}  from "mongoose";
const {ObjectId} = Schema.Types;

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
        
        console.log(contentType ,tags , link , title);

        const tagIds: any = [];
        tags.map((tag:any) => {
            tagIds.push(tag.value);
        })

        // create user content
        const createContent = await (await contentModel.create({contentType , link , title , tags:tagIds , userId})).populate("tags" , "tag")

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
            console.log("inside tag")
            const {tag} = req.body;
            let contentTag = await tagModel.findOne({_id: tag});

            if(!contentTag) contentTag = await tagModel.create({tag})
            
            res.status(200).send({
                message : "tag added",
                tag: contentTag.tag
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

    export const getTag : RequestHandler = async (req: Request , res: Response) : Promise<void> => {
        try{
             console.log("inside getTag");
             const getTag = await tagModel.find({});
            
            res.status(200).send({
                message : "tag fatched",
                tags : getTag
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

export const getContent : RequestHandler = async(req: Request , res: Response) : Promise<void> => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const getId = userReq.userId;
        
        // get your content
        const getContent = await contentModel.find({userId : getId}).populate("tags" , "tag");
        res.status(200).send({
            status : "success",
            message : "Data fatched",
            content : getContent
        })

    } catch(err: unknown){
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

export const deleteContent : RequestHandler = async(req: Request , res: Response) : Promise<void> => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const {userId} = userReq;
        const {contentId} = req.body;

        // delete content
        await contentModel.findOneAndDelete({userId : userId , _id : contentId});
        res.status(200).send({
            status : "success",
            message : "content deleted"
        })

    } catch(err: unknown){
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

export const updateContent : RequestHandler = async(req: Request , res: Response) : Promise<void> => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const {userId} = userReq;
        const {contentId , contentType , link , title , tags} = req.body;

        // if(tags){
        //     const findContent = await contentModel.findOneAndUpdate({userId : userId , _id : contentId} , {
                
        //     });
        // }

        // delete content
        await contentModel.findOneAndUpdate({userId : userId , _id : contentId} , {contentType , link , title});

        res.status(200).send({
            status : "success",
            message : "content deleted"
        })

    } catch(err: unknown){
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

export const shareContent : RequestHandler = async(req: Request , res: Response) : Promise<void> => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const {userId} = userReq;

        // find user for check share is true or false
        const checkUser = await userModel.findOne({_id : userId})
        console.log(checkUser)

        if (checkUser){
            // now create user sharable link for whole content
                // urlencoded

        }



        res.status(200).send({
            status : "success",
            message : "content deleted"
        })

    } catch(err: unknown){
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
