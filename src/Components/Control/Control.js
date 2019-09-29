import React from 'react';
import './Control.css';
import Button from '../Button';

export default function Control(props) {
  return (
    <div className="control">
      <div className="up">
        <Button
          handleClick={props.handleClick}
          id="up"
          disabled={props.disabled}
        >
          up
        </Button>
      </div>
      <div className="horizontal-btn">
        <Button
          handleClick={props.handleClick}
          id="left"
          disabled={props.disabled}
        >
          left
        </Button>
        <Button
          handleClick={props.handleClick}
          id="play"
          disabled={props.disabled}
        >
          play
        </Button>
        <Button
          handleClick={props.handleClick}
          id="right"
          disabled={props.disabled}
        >
          right
        </Button>
      </div>
      <div className="down">
        <Button
          handleClick={props.handleClick}
          id="down"
          disabled={props.disabled}
        >
          down
        </Button>
      </div>
    </div>
  )
}
