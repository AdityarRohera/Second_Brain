import Card from "./Card"
import type { RefObject } from "react";

interface ContentType {
  contentRef : RefObject<HTMLDivElement | null>;
}

function Content({contentRef} : ContentType) {
  return (
    <div ref={contentRef} className=" border flex flex-wrap p-10 gap-5">

      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>

      <Card title='Project Ideas' link="https://twitter.com/Ankiii_i/status/1921590665646895185?ref_src=twsrc%5Etfw" tags='#Productivity' type='twitter' date='10/10/2024'/>

      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>

      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>

      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>
      
      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>

      <Card title='Project Ideas' link='https://www.youtube.com/embed/vv4y_uOneC0?si=wzbToqSzT2K_SGhs' tags='#Productivity' type='youtube' date='10/10/2024'/>

      

    </div>
  )
}
export default Content
