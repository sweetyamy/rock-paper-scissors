import React from 'react';

const Box = (props) => {
  console.log('props', props);

  // change box outline color based on result
  const getBoxClass = () => {
    let boxClass = 'box';
    if (props.result === 'You win!' && props.title === 'Computer') {
      boxClass += ' lose-border darken';
    } else if (props.result === 'You lose!' && props.title === 'User') {
      boxClass += ' lose-border darken';
    } else if (props.result === 'You win!' && props.title === 'User') {
      boxClass += ' win-border';
    }
    return boxClass;
  };

  // const getBoxClass = () => {
  //   if (props.result === 'You win!') {
  //     return 'box win-border';
  //   } else if (props.result === 'You lose!') {
  //     return 'box lose-border';
  //   } else {
  //     return 'box';
  //   }
  // };

  return (
    <div className={getBoxClass()}>
      <h1>{props.title}</h1>
      <img
        src={props.item && props.item.img}
        className='item-img'
        alt={props.item && props.item.alt}
      />
    </div>
  );
};

export default Box;
