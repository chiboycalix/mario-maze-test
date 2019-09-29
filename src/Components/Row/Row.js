import React from 'react';
import './Row.css';
import Cell from '../Cell';

export default function Row({x, i}) {
  const row = [];
  for(let j = 0; j < x[i].length; j += 1) {
    row.push(<Cell id={i+""+j} key={i+""+j}/>)
  }
  return (
    <div className="row">
      { row }
    </div>
  )
}
