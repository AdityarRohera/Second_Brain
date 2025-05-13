import SideBarItem from "./SideBarItem";
import { LuBrain } from "react-icons/lu";
import { TbBrandTwitter } from "react-icons/tb";
import { LiaYoutube } from "react-icons/lia";
import { CgFileDocument } from "react-icons/cg";

function SideBar() {
  return (
    <div className="border-2 border-gray-300 w-[20%] h-[100vh] p-2 bg-white">

        {/* Application name div */}
      <div className=" flex gap-5 w-full h-[60px] items-center">
        <LuBrain className="w-[40px] h-[40px] text-blue-500" />
        <h1 className="text-[28px] font-bold opacity-85">Second Brain</h1>
      </div>

      {/* SideBarItem */}
      <div className="mt-[40px] flex flex-col gap-6 opacity-80">
        <SideBarItem title="Tweets" icon={<TbBrandTwitter />}/>
        <SideBarItem title="Videos" icon={<LiaYoutube />}/>
        <SideBarItem title="Documents" icon={<CgFileDocument />}/>
      </div>
    </div>  
  )
}

export default SideBar;
