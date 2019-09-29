import React, { Component } from 'react';
import './Board.css';
import Row from '../Row';
import Mario from './mario.png';
import Sprites from './square.png'
import Control from '../Control';
import Modal from '../Modal';
import Input from '../Input'
import Button from '../Button';

export class Board extends Component {
  state = {
    cordinate: '00',
    maxX: 4,
    maxY: 4,
    xCordinate: 0,
    yCordinate: 0,
    steps: 0,
    isSpritesAvailable: true,
    isPlaying: false,
  }

  generateSprites = (maxX, maxY) => {
    // const { maxX, maxY } = this.state;
    let i = 0;
    let numSprites = maxX > maxY ? maxX : (maxX === maxY) ? maxY : maxY
   
    while (i < numSprites) {
      const x = Math.floor(Math.random() * (maxX))
      const y = Math.floor(Math.random() * (maxY))
      const randomCordinate = `${x + ',' + y}`;
      document.getElementById(`${randomCordinate.split(',').join('')}`).innerHTML = `<img src=${Sprites} height="50px" width="50px" alt="sprite" />`;
      i += 1;
    }
   
    document.getElementById(`${this.state.cordinate}`).innerHTML = `<img src=${Mario} height="50px" width="50px" alt="sprite" />`;
  }

  componentDidMount() {
    const { maxX, maxY } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      // cordinate: Math.floor(maxX / 2) + "" + Math.floor(maxY / 2)
    }))
    this.generateSprites(maxX, maxY);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cordinate } = this.state;
    document.getElementById(`${prevState.cordinate}`).innerHTML = "";
    document.getElementById(`${cordinate}`).innerHTML = `<img src=${Mario} height="50px" width="50px" alt="mario" />`;
    if (prevState.cordinate !== cordinate) {
      const availableSprites = document.querySelectorAll('img')
      const arrayOfSprites = Array.from(availableSprites);
      this.setState(prevState => ({
        ...prevState,
        isSpritesAvailable: false,
        steps: this.state.steps + 1,
      }));

      for (let i = 0; i < arrayOfSprites.length; i += 1) {
        if (arrayOfSprites[i].getAttribute('alt') === 'sprite') {
          return this.setState(prevState => ({
            ...prevState,
            isSpritesAvailable: true,
          }));
        }
      }
      return this.setState(prevState => ({
        ...prevState,
        isSpritesAvailable: false,
      }));
    }
  }

  handleClick = (event) => {
    const { target: { id } } = event;
    const { cordinate } = this.state;
    switch (id) {
      case 'up': {
        let y = cordinate.split('')
        if (y[0] > 0) {
          y[0] -= 1
          this.setState((prevState) => ({
            ...prevState,
            cordinate: y.join('')
          }))
        } else {
          this.setState((prevState) => ({
            ...prevState,
          }))
        }

        break;
      }
      case 'left': {
        let x = cordinate.split('')
        if (x[1] > 0) {
          x[1] -= 1
          this.setState((prevState) => ({
            ...prevState,
            cordinate: x.join('')
          }))
        } else {
          this.setState((prevState) => ({
            ...prevState,
          }))
        }
        break;
      }

      case 'right': {
        let x = cordinate.split('')
        const { maxY } = this.state;

        if (x[1] < maxY - 1) {
          x[1] = parseInt(x[1]) + 1;
          this.setState((prevState) => ({
            ...prevState,
            cordinate: x.join('')
          }))
        } else {
          this.setState((prevState) => ({
            ...prevState,
          }))
        }
        break;
      }

      case 'down': {
        let y = cordinate.split('')
        const { maxX } = this.state;
        if (y[0] < maxX - 1) {
          y[0] = parseInt(y[0]) + 1;
          this.setState((prevState) => ({
            ...prevState,
            cordinate: y.join('')
          }))
        } else {
          this.setState((prevState) => ({
            ...prevState,
          }))
        }
        break;
      }

      case 'play': {
        this.setState((prevState) => ({
          ...prevState,
          isPlaying: !prevState.isPlaying,
        }))
        break;
      }

      default: {
        return '00'
      }
    }
  }
  renderModalComponent = () => {
    // const { xCordinate, yCordinate } = this.state;
    return (
      <div>
        <Input type="number" id="xCordinate" handleChange={this.handleChange}/>
        <Input type="number" id="yCordinate"  handleChange={this.handleChange}/>
        <Button children="submit" handleClick={this.handSubmit}/>
      </div>
    )
  }

  handleChange = (event) => {
    const { id, value} = event.target;
    this.setState(prevState => ({
      ...prevState,
      [id]: parseInt(value),
    }));
  }

  handSubmit = (event) => {
    event.preventDefault();
    const { maxX, maxY, xCordinate, yCordinate} = this.state;
    this.setState((prevState) => ({
      ...prevState,
      maxX: xCordinate,
      maxY: yCordinate,
    }), this.setState((prevState) => ({
      ...prevState,
      isPlaying: false,
    })))
    this.generateSprites(maxX, maxY)
  }
  render() {
    const board = [];
    const { maxX, maxY, isSpritesAvailable, steps, isPlaying } = this.state;
    const boardSize = [...Array(maxX)].map(() => Array(maxY).fill(0));
    for (let i = 0; i < maxX; i += 1) {
      board.push(<Row x={boardSize} key={i} i={i} />);
    }
    return (
      <div className="board">
        <div className={`showBoard-${isPlaying ? 'hide' : 'show'}`}>
          {board}
        </div>

        {isPlaying && (
          <Modal modalComponent={this.renderModalComponent()}/>
        )}
        <Control handleClick={this.handleClick} disabled={!isSpritesAvailable} />
        {!isSpritesAvailable ? (<Modal stepsCount={steps} />) : (null)}
      </div>
    )
  }
}

export default Board
