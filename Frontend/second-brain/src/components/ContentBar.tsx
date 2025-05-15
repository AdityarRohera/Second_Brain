
import { useRef } from "react";
// import { useState } from "react";
import AddContent from "./AddContent"
import Content from "./Content"
import NavBar from "./NavBar"

function ContentBar() {

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
      <Content contentRef = {contentRef}/>
      <AddContent addRef={addRef} onClose={closeHandler}/>
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
