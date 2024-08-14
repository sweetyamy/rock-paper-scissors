import './App.css';
import Box from './component/Box';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// user can see two boxes and there are title, picture, and result
// user can see three buttons and there are rock, paper, and scissors
// when the user click a button, the item will apear in the box
// computer select a reandom item
// the winner will be shown
// the box outline will be changed depeding on the winner

const choice = {
  rock: {
    name: 'Rock',
    img: 'https://images.saymedia-content.com/.image/t_share/MTc1MTE1ODQxOTE3MjMyOTY0/incredible-rock-formations.jpg',
    alt: 'rock'
  },

  paper: {
    name: 'Paper',
    img: 'https://orig12.deviantart.net/2b73/f/2014/044/4/3/crumpled_paper_texture_by_pkgam-d73k5mj.jpg',
    alt: 'paper'
  },

  scissors: {
    name: 'Scissors',
    img: 'https://m.media-amazon.com/images/S/aplus-media/vc/a7258b6a-eead-412c-b25f-3e718f610a56.jpg',
    alt: 'scissors'
  }
};

function App() {
  // usestate for user selection
  const [userSelect, setUserSelect] = useState(null);

  // usestate for computer selection
  const [computerSelect, setComputerSelect] = useState(null);

  // usestate for result
  const [result, setResult] = useState('');

  // usestate for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // usestate for user record
  const [userWins, setUserWins] = useState(0);

  // usestate for user record
  const [computerWins, setComputerWins] = useState(0);

  // usestate for tie record
  const [tieCount, setTieCount] = useState(0);

  // useEffect to set initial random images
  useEffect(() => {
    setUserSelect(randomChoice());
    setComputerSelect(randomChoice());
  }, []);

  // useEffect to update background color based on result
  useEffect(() => {
    const body = document.body;
    if (result === 'You win!') {
      body.className = 'win-background';
      setUserWins((prevUserWins) => prevUserWins + 1);
    } else if (result === 'You lose!') {
      body.className = 'lose-background';
      setComputerWins((prevComputerWins) => prevComputerWins + 1);
    } else if (result === 'Tie!') {
      setTieCount((prevTieCount) => prevTieCount + 1);
    } else {
      body.className = '';
    }
  }, [result]);

  // onclick event fucntion
  const play = (userChoice) => {
    console.log('selected', userChoice);
    setUserSelect(choice[userChoice]);

    // call computer selection funciton
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);

    // call result function
    showResult(choice[userChoice], computerChoice);

    // call result modal
    setIsModalOpen(true);
  };

  // computer selection function
  const showResult = (user, computer) => {
    console.log('user', user, 'computer', computer);

    if (user.name === computer.name) {
      setResult('Tie!');
    } else if (user.name === 'Rock')
      return computer.name === 'Scissors'
        ? setResult('You win!')
        : setResult('You lose!');
    else if (user.name === 'Paper')
      return computer.name === 'Rock'
        ? setResult('You win!')
        : setResult('You lose!');
    else if (user.name === 'Scissors')
      return computer.name === 'Paper'
        ? setResult('You win!')
        : setResult('You lose!');
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체의 키값만 뽑아서 배열로 만들어줌
    console.log('itemArray', itemArray);

    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log('randomItem', randomItem);

    let final = itemArray[randomItem];
    console.log('final', final);
    return choice[final];
  };

  // reset fucntion
  const resetGame = () => {
    setUserWins(0);
    setComputerWins(0);
    setTieCount(0);
    setResult('');
    setUserSelect(null);
    setComputerSelect(null);
    document.body.className = ''; // 배경 리셋
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='container'>
        {/* 1st Row: Game Record */}
        <div className='game-record'>
          <div>User: {userWins}</div>
          <div>Computer: {computerWins}</div>
          <div>Tie: {tieCount}</div>
          <div>
            <Button variant='danger' onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>

        {/* 2nd Row: Boxes */}
        <div className='boxes'>
          <Box title='User' item={userSelect} result={result} />
          <Box title='Computer' item={computerSelect} result={result} />
        </div>

        {/* 3rd Row: Buttons */}
        <div className='btn-container'>
          <Button
            variant='primary'
            className='btn-game'
            onClick={() => play('rock')}
          >
            <FontAwesomeIcon icon={faHandRock} /> Rock
          </Button>
          <Button
            variant='primary'
            className='btn-game'
            onClick={() => play('paper')}
          >
            <FontAwesomeIcon icon={faHandPaper} /> Paper
          </Button>
          <Button
            variant='primary'
            className='btn-game'
            onClick={() => play('scissors')}
          >
            <FontAwesomeIcon icon={faHandScissors} /> Scissors
          </Button>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        dialogClassName='custom-modal'
      >
        <Modal.Body>
          <h1>{result}</h1>
          <br />
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
