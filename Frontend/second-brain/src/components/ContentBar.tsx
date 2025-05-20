
import { useRef , useEffect , useState } from "react";
// import { useState } from "react";
import AddContent from "./AddContent"
import Content from "./Content"
import NavBar from "./NavBar"
import axios from "axios";

function ContentBar() {

   // call api for get user card info 

  const [allCards , setAllCards] = useState([]);

  const getCards = async() => {
    try{
          console.log("inside getcards")
          const token = localStorage.getItem('token');
          const res = await axios.get("http://localhost:3000/api/v1/user/content" , 
             {headers: {'Content-Type': 'application/json' , token: `${token}`}, withCredentials:true}
          )

          if(res){
            console.log(res.data);
            const {content} = res.data;
            setAllCards(content);
          }

    } catch(err:any){
        if (err.response) {
             console.log("Backend error:", err.response.data);
             alert(err.response.data.message);
             } else {
             console.log("Network or setup error:", err.message);
             }
      }
  }

  useEffect(() => {
    getCards();
  } , [])

  const addRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function addButtonHandler(){
    addRef.current?.classList.add('active')
    contentRef.current?.classList.add('light-backgrond')
  }

  function closeHandler(){
     addRef.current?.classList.remove('active')
     contentRef.current?.classList.remove('light-backgrond')
  }

  return (
    <div className="w-[80%] , h-[100%] relative">
      <NavBar addButton = {addButtonHandler}/>
      <Content contentRef = {contentRef} allCards={allCards}/>
      <AddContent addRef={addRef} onClose={closeHandler} getCards={getCards}/>
    </div>
  )
}

export default ContentBar;



// optimized contentBar
// function ContentBar() {

//   // const addRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // const [open , setOpen] = useState(false);
//   const open = useRef(false);

//   function addButtonHandler(){
//     // setOpen(true);
//     open.current = true;
//     contentRef.current?.classList.add('light-backgrond')
//   }

//   function closeHandler(){
//     // setOpen(false);
//     open.current = false;
//     contentRef.current?.classList.remove('light-backgrond')
//   }

//   return (
//     <div className="w-[80%] , h-[100%] relative">
//       <NavBar addButton = {addButtonHandler}/>
//       <Content contentRef = {contentRef}/>
//       {/* <AddContent addRef={addRef} contentRef={contentRef}/> */}
//       <AddContent open={open} onClose={closeHandler} />
//     </div>
//   )
// }

// export default ContentBar;
