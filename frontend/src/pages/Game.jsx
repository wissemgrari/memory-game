import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../App.css';
import SingleCard from '../components/SingleCard';
import { setScore } from '../features/user/userSlice';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { name, score } = useSelector((state) => state.user);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsStarted(true);
    setIsCompleted(false);
  };

  // start the game automagically
  useEffect(() => {
    if (isStarted) {
      shuffleCards();
    }
  }, [isStarted]);

  // hanlde choice
  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (isStarted) {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => {
            resetTurn();
          }, 1000);
        }
      }
    }
  }, [choiceOne, choiceTwo, isStarted]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    dispatch(setScore(turns));
    setDisabled(false);
  };

  const handleQuit = () => {
    setIsStarted(false);
    setIsCompleted(false);
  };
  const handleExit = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isStarted) {
      setIsCompleted(cards.every((elem) => elem.matched === true));
    }

    if (isCompleted) {
      axios.post('/api/', {
        firstName: name.firstName,
        lastName: name.lastName,
        score: turns,
      });
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'You complete the challenge',
          confirmButtonText: 'Keep playing',
          confirmButtonColor: '#c23866',
          showCancelButton: true,
          cancelButtonText: 'Go home',
          cancelButtonColor: 'green',
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            setIsStarted(false);
            setIsCompleted(false);
          } else {
            shuffleCards();
          }
        });
      }, 200);
    }
  }, [isStarted, cards, isCompleted]);

  return (
    <div className='game'>
      {!isStarted ? (
        <>
          <h2>
            Welcome again {name.firstName} {name.lastName}
          </h2>
          <div className='options'>
            <button onClick={shuffleCards}>Start Game</button>
            <button onClick={() => navigate('/stats')}>View Stats</button>
            <button onClick={handleExit}>Exit</button>
          </div>
        </>
      ) : (
        <>
          <div className='header'>
            <button onClick={shuffleCards}>Suffle Cards</button>
            <button>Turns: {turns}</button>
            <button onClick={handleQuit}>Quit</button>
          </div>
          <div className='divider'></div>
          <div className='card-grid'>
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
