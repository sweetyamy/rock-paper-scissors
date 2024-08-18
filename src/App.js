import React, { Component } from 'react';
import './App.css';
import Box from './component/BoxFunction';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const choice = {
  rock: {
    name: 'Rock',
    img: 'https://images.saymedia-content.com/.image/t_share/MTc1MTE1ODQxOTE3MjMyOTY0/incredible-rock-formations.jpg',
    alt: 'rock',
  },

  paper: {
    name: 'Paper',
    img: 'https://orig12.deviantart.net/2b73/f/2014/044/4/3/crumpled_paper_texture_by_pkgam-d73k5mj.jpg',
    alt: 'paper',
  },

  scissors: {
    name: 'Scissors',
    img: 'https://m.media-amazon.com/images/S/aplus-media/vc/a7258b6a-eead-412c-b25f-3e718f610a56.jpg',
    alt: 'scissors',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: '',
      isModalOpen: false,
      userWins: 0,
      computerWins: 0,
      tieCount: 0,
    };
  }

  // set initial random images
  componentDidMount() {
    this.setState({
      userSelect: this.randomChoice(),
      computerSelect: this.randomChoice(),
    });
  }

  // update background color based on result
  componentDidUpdate(prevProps, prevState) {
    if (prevState.result !== this.state.result) {
      const body = document.body;
      if (this.state.result === 'You win!') {
        body.className = 'win-background';
        this.setState((prevState) => ({ userWins: prevState.userWins + 1 }));
      } else if (this.state.result === 'You lose!') {
        body.className = 'lose-background';
        this.setState((prevState) => ({
          computerWins: prevState.computerWins + 1,
        }));
      } else if (this.state.result === 'Tie!') {
        body.className = 'tie-background';
        this.setState((prevState) => ({ tieCount: prevState.tieCount + 1 }));
      } else {
        body.className = '';
      }
    }
  }

  play = (userChoice) => {
    console.log('selected', userChoice);
    const userSelection = choice[userChoice];
    const computerChoice = this.randomChoice();

    this.setState(
      {
        userSelect: userSelection,
        computerSelect: computerChoice,
      },
      () => {
        this.showResult(userSelection, computerChoice);
        this.setState({ isModalOpen: true });
      }
    );
  };

  showResult = (user, computer) => {
    console.log('user', user, 'computer', computer);

    if (user.name === computer.name) {
      this.setState({ result: 'Tie!' });
    } else if (user.name === 'Rock') {
      this.setState({
        result: computer.name === 'Scissors' ? 'You win!' : 'You lose!',
      });
    } else if (user.name === 'Paper') {
      this.setState({
        result: computer.name === 'Rock' ? 'You win!' : 'You lose!',
      });
    } else if (user.name === 'Scissors') {
      this.setState({
        result: computer.name === 'Paper' ? 'You win!' : 'You lose!',
      });
    }
  };

  randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const finalChoice = choice[itemArray[randomItem]];
    return finalChoice;
  };

  resetGame = () => {
    this.setState({
      userSelect: null,
      computerSelect: null,
      result: '',
      isModalOpen: false,
      userWins: 0,
      computerWins: 0,
      tieCount: 0,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>
        <div className='container'>
          {/* 1st Row: Game Record */}
          <div className='game-record'>
            <div>User: {this.state.userWins}</div>
            <div>Computer: {this.state.computerWins}</div>
            <div>Tie: {this.state.tieCount}</div>
            <div>
              <Button variant='danger' onClick={this.resetGame}>
                Reset
              </Button>
            </div>
          </div>

          {/* 2nd Row: Boxes */}
          <div className='boxes'>
            <Box
              title='User'
              item={this.state.userSelect}
              result={this.state.result}
            />
            <Box
              title='Computer'
              item={this.state.computerSelect}
              result={this.state.result}
            />
          </div>

          {/* 3rd Row: Buttons */}
          <div className='btn-container'>
            <Button
              variant='primary'
              className='btn-game'
              onClick={() => this.play('rock')}
            >
              <FontAwesomeIcon icon={faHandRock} /> Rock
            </Button>
            <Button
              variant='primary'
              className='btn-game'
              onClick={() => this.play('paper')}
            >
              <FontAwesomeIcon icon={faHandPaper} /> Paper
            </Button>
            <Button
              variant='primary'
              className='btn-game'
              onClick={() => this.play('scissors')}
            >
              <FontAwesomeIcon icon={faHandScissors} /> Scissors
            </Button>
          </div>
        </div>

        <Modal
          show={this.state.isModalOpen}
          onHide={this.closeModal}
          centered
          dialogClassName='custom-modal'
        >
          <Modal.Body>
            <h1>{this.state.result}</h1>
            <br />
            <Button variant='secondary' onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
