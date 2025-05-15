import { useState } from "react"
import InputBox from "../components/InputBox"
import Button from "../components/Button";

function SignIn() {

    const [userAuth , setUserAuth] = useState({username:"" , password:""});
    console.log(userAuth);

    const submitHandler = () => {
        console.log(userAuth);
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
      <Button variant={"redish"} size={"lg"} text="Signup" onClick={submitHandler}/>
    </div>
  )
}

export default SignIn;