import { useEffect, useRef, useState } from 'react';
import Player from './Player';
import ButtonsActions from './ButtonsActions';
import Results from './Results';
import '../styles/Blackjack.css';
import {
  reduceAce,
  checkAce,
  getValue,
  getNewCard,
  initDeck,
  handleResultMessage,
} from '../hooks/customHooks';

const Blackjack = () => {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerCanHit, setPlayerCanHit] = useState(true);
  const playerSum = useRef(0);
  const dealerSum = useRef(0);
  const dealerAceCount = useRef(0);
  const playerAceCount = useRef(0);
  const hidden = useRef('');
  const messageProp = useRef('');

  useEffect(() => {
    startGame();
  }, []);

  function resetGame() {
    setDealerHand([]);
    setPlayerHand([]);
    setPlayerCanHit(true);
    playerSum.current = 0;
    dealerSum.current = 0;
    dealerAceCount.current = 0;
    playerAceCount.current = 0;
    hidden.current = '';
    messageProp.current = '';
    startGame();
  }

  async function startGame() {
    await initDeck();
    hidden.current = await getNewCard();
    dealerSum.current = dealerSum.current + getValue(hidden.current);
    dealerAceCount.current = dealerAceCount.current + checkAce(hidden.current);
    setDealerHand([{ src: hidden.current, hidden: true }]);

    while (dealerSum.current < 17) {
      let card = {
        src: await getNewCard(),
      };
      dealerSum.current = dealerSum.current + getValue(card.src);
      dealerAceCount.current = dealerAceCount.current + checkAce(card.src);
      setDealerHand((prev) => [...prev, card]);
    }

    for (let i = 0; i < 2; i++) {
      let card = {
        src: await getNewCard(),
      };
      playerSum.current = playerSum.current + getValue(card.src);
      playerAceCount.current = playerAceCount.current + checkAce(card.src);
      setPlayerHand((prev) => [...prev, card]);
    }
  }

  function stay() {
    dealerSum.current = reduceAce(dealerSum.current, dealerAceCount.current);
    playerSum.current = reduceAce(playerSum.current, playerAceCount.current);
    setPlayerCanHit(false);
    setDealerHand((prev) => {
      return prev.map((card) => {
        if (card.hidden) {
          return { ...card, hidden: false };
        } else return card;
      });
    });
    messageProp.current = handleResultMessage(
      playerSum.current,
      dealerSum.current
    );
  }

  async function hit() {
    if (!playerCanHit) {
      return;
    }
    let card = {
      src: await getNewCard(),
    };
    playerSum.current = playerSum.current + getValue(card.src);
    playerAceCount.current = playerAceCount.current + checkAce(card.src);
    setPlayerHand((prev) => [...prev, card]);
    if (reduceAce(playerSum.current, playerAceCount.current) > 21) {
      stay();
    }
  }

  return (
    <div className="body">
      <Player
        title={'Dealer'}
        sum={playerCanHit ? '' : dealerSum.current}
        cardsProps={dealerHand}
      />
      <Player
        title={'Player'}
        sum={playerSum.current}
        cardsProps={playerHand}
      />
      <ButtonsActions
        playerCanHit={playerCanHit}
        hit={hit}
        stay={stay}
        playAgain={resetGame}
      />
      <Results message={messageProp.current} />
    </div>
  );
};

export default Blackjack;
