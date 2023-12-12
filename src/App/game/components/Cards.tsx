import React from 'react';
import './index.css';

export interface CardsProps {
    data: any;
    onCardClick: (id: number) => void;
}

export const Cards:React.FC<CardsProps> = (props: CardsProps) => {
    const { data, onCardClick } = props;
    return(
        <button key={data.id} className='card' onClick={() => onCardClick(data)}>
            {data.isFlipped ? data.value : '?'}
        </button>
    );
};

export default Cards;