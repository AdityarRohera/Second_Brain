import type { ReactElement } from "react";


interface SideBarItemType {
    icon : ReactElement,
    title : string
}

function SideBarItem({icon , title} : SideBarItemType) {
  return (
    <div className="flex gap-5 text-1xl w-[100%] h-[40px] text-2xl font-medium justify-start items-center pl-5">
      {icon}
      <h1 className="">{title}</h1>
    </div>
  )
}

export default SideBarItem;