 //case input of List without render List
 import { useState, useEffect } from "react"
 
 const Input = ({getMax, go}) =>{
    const [max1, setMax1] = useState('')
useEffect(()=>{
     getMax(max1)
    },[go]) 
      return(
    <input style={{width: '96%'}}
    type="text" placeholder="This input dont render all component "
     onChange={(e) => setMax1(e.target.value)}
    className="lsOptionInput"
    />
    )}
    export default Input;


