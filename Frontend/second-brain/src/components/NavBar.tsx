import Button from "./Button"
import { LuShare2 } from "react-icons/lu";

function NavBar() {
  return (
    <div className=" flex w-[100%] h-[15%] justify-between items-center p-10"> 
      <h1 className="text-4xl font-bold opacity-90">All Notes</h1>

        {/* Buttons  */}
      <div className="flex gap-5">
         <Button variant="secondary" size='lg' text='Share Brain' startIcon={<LuShare2 />} onClick={() => {console.log("button clicked 2")}} />
         <Button variant="primary" size='lg' text='Add Content' onClick={() => {console.log("button clicked")}} />
      </div>

    </div>
  )
}

export default NavBar
