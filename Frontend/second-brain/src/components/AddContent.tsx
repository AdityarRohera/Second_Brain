import type { RefObject } from "react";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
// import React from 'react';
import Select from 'react-select';
import InputBox from "./InputBox";
import Button from "./Button";

interface AddContentType {
  addRef: RefObject<HTMLDivElement | null>; // ✅ allows null
  onClose : () => void;
}

type OptionType = {
  value: string;
  label: string;
};

//  select tags 
    const options:  OptionType[]  = [
      {value: "productivity" , label: "Productivity"},
      {value: "ideas" , label: "Ideas"},
      {value: "learning" , label: "Learning"}
    ]

// AddContent Component;
function AddContent({ addRef , onClose }: AddContentType) {

  const [inputValue, setInputValue] = useState({
    title: "",
    url: "",
    tags: [] as string[],
  });

  const [selectedTag, setSelectedTag] = useState<OptionType | null>(null);

  console.log(inputValue);

    const addTagHandler = () => {
      console.log("Tag Added")
    }

    const inputChangeHandler = (e:any) => {
       const {name , value} = e.target;
       setInputValue((prev) => {
        return {...prev , [name]: value}
       })
    }

   const handleTagChange = (selected: OptionType | null) => {
           if (!selected) return;
      
        console.log(selected.label); // ✅ correct way
      
        setSelectedTag(selected);
      
        setInputValue((prev) => ({
          ...prev,
          tags: [...prev.tags, selected.label], // if you want only labels in state
        }));
  };


    const submitHandler = (e: any) => {
      e.preventDefault();
      console.log("submitted");
      onClose();
    }

  //   const removeTag = (valueToRemove: string) => {
  //   setInputValue((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((tag) => tag.value !== valueToRemove),
  //   }));
  // };


  return (
    <div
      ref={addRef}
      className="border-2 border-gray-400 bg-white h-[500px] w-[500px] fixed top-[30%] left-[45%] hidden p-4 rounded-2xl"
    >

        {/* header  */}
      <div className=" flex justify-between items-center w-[100%] pb-5">
         <h1 className="text-2xl">Add Your Content</h1>
         <button onClick={() => onClose()}>
         <IoClose className="bg-red-600 w-10 h-10 text-white" />
         </button>
      </div>

      <form action="" className="flex flex-col gap-6">

        {/* title  */}
      <div className="flex justify-between text-2xl">
        <label htmlFor="title">Title :</label>
        <InputBox type="text" Placeholder="Enter the Title" name="title" id="title" value={inputValue.title || ""} onChange={inputChangeHandler}/>
      </div>

      {/* upload url  */}
      <div className="flex justify-between text-2xl">
        <label className="min-w-[150px]" htmlFor="title">Upload Link :</label>
        <InputBox type="text" Placeholder="upload url..." name="url" id="url" value={inputValue.url || ""} onChange={inputChangeHandler}/>
      </div>

      {/* tags  */}
      <div className="flex flex-col gap-5">

        {/* selectTag  */}
        <div className="flex justify-between items-center gap-3 h-[40px]">
        <Select className="w-[60%] text-2xl" options={options} name="select-tag" value={selectedTag ? selectedTag : undefined } onChange={(e) => {handleTagChange(e)}} />
          <Button variant={"primary"} size={"lg"} text="Add Tag" onClick={addTagHandler}/>
        </div>

          {/* contain all tags */}
          <div className="border-2 border-gray-200 w-[100%] min-h-[150px] p-2 rounded-2xl flex justify-center items-center text-blue-600 gap-3">

            {inputValue.tags.map((tag, index) => (
                <span key={index}>{`#${tag}` + " "}</span>
            ))}
            
          </div>

      </div>

      <div className="m-auto">
        <Button variant={"redish"} size={"lg"} text="Add Tag" onClick={submitHandler}/>
      </div>

      </form>

    </div>
  );
}

export default AddContent;



// ---- Add content ---- by use state


// interface AddContentType {
//   open : RefObject<boolean>,
//   onClose : () => void
// }

// type OptionType = {
//   value: string;
//   label: string;
// };

// //  select tags 
//     const options:  OptionType[]  = [
//       {value: "productivity" , label: "Productivity"},
//       {value: "ideas" , label: "Ideas"},
//       {value: "learning" , label: "Learning"}
//     ]


// function AddContent({open , onClose} : AddContentType) {

//   const [selectedTag ,setSelectedTag] = useState<OptionType | null>(null);

//   // Here are all functions
//     function changeHandler(selectedOption: any) {
//         console.log(selectedOption); // Logs the selected option object
//         setSelectedTag(selectedOption);
//     }
    
//   return (
//     <div>
//       {
//         open &&  <div className="border-2 border-gray-400 bg-white h-[500px] w-[400px] fixed top-[30%] left-[45%] p-4 rounded-2xl">

//         {/* header  */}
//       <div className=" border flex justify-between items-center w-[100%]">
//         <h1>Add your Content</h1>
//         <button onClick={() => onClose()}>
//         <IoClose className="bg-red-600 w-10 h-10 text-white" />
//       </button>
//       </div>

//       <form action="">

//         {/* title  */}
//       <div>
//         <label htmlFor="title">Title :</label>
//         <input type="text" name="title" id="title" />
//       </div>

//       {/* upload url  */}
//       <div className="">
//         <label htmlFor="url">Upload URL : </label>
//         <input className=" border-1 border-gray-100" type="text" name="title" id="title" />
//       </div>

//       {/* tags  */}
//       <div className="flex flex-col gap-5">

//         <div className="flex justify-between items-center">
          
//         <Select className="w-[70%]" options={options} value={selectedTag ? selectedTag : undefined} onChange={changeHandler} />
//           <button className="border-1 bg-red-300 text-white font-bold p-[5px]" onClick={(e) => {e.preventDefault()}}>Create Tags</button>

//         </div>

//           <div className="border-2 border-gray-200 w-[100%] min-h-[100px] p-2 rounded-2xl flex justify-center items-center text-blue-600">
//             {
//               selectedTag ? `#${selectedTag.value}` : ""
//             }
//           </div>

//       </div>

//       </form>

//     </div>
//       }
//     </div>
//   )
// }

// export default AddContent;


