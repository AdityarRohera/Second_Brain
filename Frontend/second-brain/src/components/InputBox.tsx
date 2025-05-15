
interface InputBoxType {
    type: string;
    Placeholder? : string;
    name? :string;
    id? : string;
    value? : string;
     onChange?: (e:any) => void;
  onSubmit?: (e:any) => void;
}

function InputBox({type , value , Placeholder , name , id , onChange , onSubmit} : InputBoxType) {
  return (
    <input type={type} value={value} placeholder={Placeholder} name={name} id={id} onChange={onChange}  onSubmit={onSubmit} className="border-1 border-gray-300 rounded-[10px] min-w-[150px] max-w-[300px] h-[40px]" />
  )
}
export default InputBox;

{/* <input type="text" Placeholder /> name */}
