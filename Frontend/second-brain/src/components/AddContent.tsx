import type { RefObject } from "react";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
// import React from 'react';
import Select from 'react-select';
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

interface AddContentType {
  addRef: RefObject<HTMLDivElement | null>; // ✅ allows null
  onClose : () => void;
  getCards : () => void;
}

type OptionType = {
  value: string;
  label: string;
};

//  select tags 
  let options:  OptionType[]  = [];

// select content-type
const contentOptions = [
  { value: 'image', label: 'Image' },
  { value: 'youtube', label: 'youtube' },
  { value: 'twitter', label: 'twitter' },
  // { value: 'audio', label: 'Audio' },
];


// AddContent Component;
function AddContent({ addRef , onClose, getCards }: AddContentType) {
  console.log("inside addcontent")

  const [inputValue, setInputValue] = useState({
    title: "",
    url: "",
    tags: [] as OptionType[],
  });
  const [selectedTag, setSelectedTag] = useState<OptionType | null>(null);
   const [selectedType, setSelectedType] = useState<OptionType | null>(null);

   // functions starts here
    const addTagHandler = async(e: any) => {
      e.preventDefault();
      try{

        if(selectedTag == null){return};

        const res = await axios.post("http://localhost:3000/api/v1/user/create-tag" , {
          tag : selectedTag.value
        } , {headers: {'Content-Type': 'application/json'}, withCredentials:true});

        if(res){
          console.log(res.data);
          if(selectedTag != null){
            setInputValue((prev) => ({
              ...prev,
              tags: [...prev.tags, selectedTag],
             }));
            setSelectedTag(null); // ✅ Reset selected tag after adding
          }
        }

      }catch(err:any){
        if (err.response) {
             console.log("Backend error:", err.response.data);
             alert(err.response.data.message);
             } else {
             console.log("Network or setup error:", err.message);
             }
      }
    }

    const getAllTags = async() => {
      try{
        const res = await axios.get("http://localhost:3000/api/v1/user/get-tags");
        if(res){
          console.log(res.data);
          const {tags} = res.data;
          tags.map((t :  { [key: string]: string }) => {
            options.push({value: `${t._id}` , label: `${t.tag}`})
          })
        }

      }catch(err:any){
         if (err.response) {
             console.log("Backend error:", err.response.data);
             alert(err.response.data.message);
             } else {
             console.log("Network or setup error:", err.message);
             }
      }
    }

    useEffect(() => {
      getAllTags();
      console.log("getallTags called")
    } , [])


    const inputChangeHandler = (e:any) => {
       const {name , value} = e.target;
       setInputValue((prev) => {
        return {...prev , [name]: value}
       })
    }

    const contentTypeHandler = (selectedOption: any) => {
          setSelectedType(selectedOption);
    };

   const handleTagChange = (selected: OptionType | null) => {
           if (!selected) return;
      
        console.log(selected.label); // ✅ correct way
      
        setSelectedTag(selected);
  };

    const submitHandler = async (e: any) => {
      e.preventDefault();
      // api call for post data
      console.log("submitted" , inputValue);

      const token = localStorage.getItem('token');

      try{
            const res = await axios.post("http://localhost:3000/api/v1/user/create-content" , {
                title : inputValue.title,
                link : inputValue.url,
                tags : inputValue.tags,
                contentType : selectedType ? selectedType.value : null
            } , {headers: {'Content-Type': 'application/json' , token: `${token}`}, withCredentials:true})
            if(res){
              console.log(res);
            }
            onClose();
            getCards();

             setInputValue({
                title: "",
                url: "",
                tags: []
              });
             setSelectedType(null); // If you're using a Select dropdown
             setSelectedTag(null);

      } catch(err : any){
         if (err.response) {
             console.log("Backend error:", err.response.data);
             alert(err.response.data.message);
             } else {
             console.log("Network or setup error:", err.message);
             }
      }
      
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
      className="border-2 border-gray-400 bg-white h-[580px] w-[500px] fixed top-[20%] left-[45%] hidden p-4 rounded-2xl"
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


      {/* content-type  */}
      <div className="flex justify-between text-2xl">
        <label htmlFor="title">Content-Type :</label>
        <Select className="w-[60%] text-2xl" options={contentOptions} value={selectedType} onChange={contentTypeHandler} placeholder={"Select content..."}></Select>
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
          <Button variant={"primary"} size={"lg"} text="Add Tag" onClick={(e) => {addTagHandler(e)}}/>
        </div>

          {/* contain all tags */}
          <div className="border-2 border-gray-200 w-[100%] min-h-[150px] p-2 rounded-2xl flex justify-center items-center text-blue-600 gap-3">

            {inputValue.tags.map((tag, index) => (
                <span key={index}>{`#${tag.label}` + " "}</span>
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


