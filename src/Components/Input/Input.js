import React from 'react'

export default function Input(props) {
  return (
    <div>
       <input type={props.type} value={props.value} onChange={props.handleChange} id={props.id}/>
    </div>
  
  )
}
