// import React from 'react'

import SideBar from "./SideBar"
import ContentBar from "./ContentBar"

function Container() {
  return (
    <div className="flex w-[100vw] h-[100vh] bg-gray-100">
      <SideBar/>
      <ContentBar/>
    </div>
  )
}

export default Container
