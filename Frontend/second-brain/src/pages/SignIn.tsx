import { useState } from "react"
import InputBox from "../components/InputBox"
import Button from "../components/Button";
import axios from "axios";

function SignIn() {

    const [userAuth , setUserAuth] = useState({username:"" , password:""});
    console.log(userAuth);

    
    const submitHandler = async(e:any) => {
        e.preventDefault();
        console.log("inside submit");

        // call post api
        try{
            const res = await axios.post("http://localhost:3000/api/v1/user/signin" , {
                // data to post
                userName : userAuth.username,
                password : userAuth.password
            } , {headers: {'Content-Type': 'application/json'}, withCredentials:true}
        );

            if(res){
                console.log("data only -> " , res.data);
                localStorage.setItem("token" , res.data.token);
            }
            
        } catch(err: any){
             if (err.response) {
            console.log("Backend error:", err.response.data);
            alert(err.response.data.message);
            } else {
            console.log("Network or setup error:", err.message);
            }
        }
    }

    const changeHandler = (e:any) : void => {
        const {name , value} = e.target;
        setUserAuth((prev) => {
            return {... prev , [name] : value}
        })
    }

  return (
    <div className="border-2 border-gray-400 flex flex-col justify-center items-center gap-6 w-[20%] h-[300px] rounded-2xl">
        <div className="flex gap-2 items-center">
            <label htmlFor="username">Username : </label>
            <InputBox type="text" Placeholder="Enter your id..." name="username" id="username" onChange={changeHandler}/>
        </div>
      
      <div className="flex gap-2 items-center">
            <label htmlFor="username">Password : </label>
           <InputBox type="text" Placeholder="Enter your passwsord..." name="password" id="password" onChange={changeHandler}/>
        </div>
      <Button variant={"redish"} size={"lg"} text="Signin" onClick={submitHandler}/>
    </div>
  )
}

export default SignIn;
