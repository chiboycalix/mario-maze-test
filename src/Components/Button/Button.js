import React from 'react';
import './Button.css'

export default function Button(props) {
  return (
   <button
    className="btn" 
    onClick={props.handleClick} 
    id={props.id}
    disabled={props.disabled}
    >
    {props.children}
    </button>
  )
}
