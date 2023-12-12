import React from 'react';
import Cards from './Cards';
import './index.css';

const GameBoard = () => {
    const emoji = Array.from(Array(8).keys()).map((x, i) => ({value: x, isFlipped: false}));
    const pairEmoji = emoji.slice();
    const flipCards = [...emoji, ...pairEmoji];
    const [cards, setCards] = React.useState(flipCards.map((x, i) => ({...x, id: i})).sort(() => Math.random() - 0.5));
    const [selectedCards, setSelectedCards] = React.useState<any>([]);

    const handleCardClick = (card: any) => {
        const cardArr: any[] = [];
        const flippedCard = cards.filter((x) => x.id === card.id)[0];
        flippedCard.isFlipped = !card.isFlipped;
        const newCards = cards.map((x) => x.id === card.id ? flippedCard : x );
        cardArr.push(flippedCard);
        const newSelectedCard = [...selectedCards, ...cardArr];
        setSelectedCards(newSelectedCard);
        setCards(newCards);
    };

    const findMatchingPair = React.useCallback(() => {
        if(selectedCards[0].value === selectedCards[1].value) {
            const matchedPairs = cards.filter((x) => x.value !== selectedCards[0].value && x.value !== selectedCards[1].value);
            setTimeout(() => {
                setCards(matchedPairs);
                setSelectedCards([]);
            }, 1000);
        } else {
            const flipAllCards = cards.map((x) => ({...x, isFlipped: false}));
            setTimeout(() => {
                setCards(flipAllCards);
                setSelectedCards([]);
            }, 1000);
        }
    }, [selectedCards, cards]);

    React.useEffect(() => {
        if(selectedCards.length === 2) {
            findMatchingPair();
        }
    }, [findMatchingPair]);

    return (
        <>
            <div className='game-title'>GameBoard</div>
            <div className='card-container'>
                {cards.length ? cards.map((card) => {
                    return (
                        <>
                            <Cards key={card.id} data={card} onCardClick={handleCardClick} />
                        </>
                    );
                }): ""}
                {cards.length === 0 ? <div className='msg'>Congrats! you have won.</div>: ''}
            </div>
        </>
    );
};

export default GameBoard;