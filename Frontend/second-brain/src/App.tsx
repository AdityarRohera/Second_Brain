// import { useState } from 'react''
import './App.css'
// import Card from './components/Card'
// import Button from './components/ui/Button'
// import { LuShare2 } from "react-icons/lu";
import SideBar from './components/SideBar';

function App() {
  
  return(
    <div className='bg-gray-100'>
      {/* <Button variant="secondary" size='lg' text='Share Brain' startIcon={<LuShare2 />} onClick={() => {console.log("button clicked 2")}} />
      <Button variant="primary" size='lg' text='Add Content' onClick={() => {console.log("button clicked")}} /> */}
      
        {/* <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='twitter' date='10/10/2024'/> */}
        {/* <Card title='Project Ideas' link="https://twitter.com/Ankiii_i/status/1921590665646895185?ref_src=twsrc%5Etfw" tags='#Productivity' type='twitter' date='10/10/2024'/> */}

        <SideBar/>
      
    </div>
  )
}

export default App;
