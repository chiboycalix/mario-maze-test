import React from 'react';
import './Modal.css';

export default function Modal(props) {
  console.log(props)
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <p>{props.stepsCount} </p>
        <div>
          {props.modalComponent}
        </div>
      </div>
    </div>
  )
}
