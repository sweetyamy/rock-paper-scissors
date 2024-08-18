import React, { Component } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
    this.getBoxClass = this.getBoxClass.bind(this);
  }

  // change box outline color based on result
  getBoxClass() {
    let boxClass = 'box';
    if (this.props.result === 'You win!' && this.props.title === 'Computer') {
      boxClass += ' lose-border darken';
    } else if (
      this.props.result === 'You lose!' &&
      this.props.title === 'User'
    ) {
      boxClass += ' lose-border darken';
    } else if (
      this.props.result === 'You win!' &&
      this.props.title === 'User'
    ) {
      boxClass += ' win-border';
    }
    return boxClass;
  }

  render() {
    return (
      <div className={this.getBoxClass()}>
        <h1>{this.props.title}</h1>
        <img
          src={this.props.item && this.props.item.img}
          className='item-img'
          alt={this.props.item && this.props.item.alt}
        />
      </div>
    );
  }
}

export default Box;
