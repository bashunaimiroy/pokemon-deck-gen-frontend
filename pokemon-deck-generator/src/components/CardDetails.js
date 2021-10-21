import { useState, useEffect } from 'react';
import axios from 'axios'

export default function CardDetails({ cardId }) {
    const [cardData, setCardData] = useState({})
    const [isLoading, setLoadingState] = useState(false);

    useEffect(() => {
        console.log(cardId)
        if (!cardId) { return; }
        setLoadingState(true)
        axios.get('http://127.0.0.1:3000/v1/cards/' + cardId)
            .then(response => {
                setLoadingState(false);
                setCardData(response.data.card)
            })
    }, [cardId])

    if (isLoading) {
        return (
            <div>Loading Card Details...</div>
        )
    }
    if (cardData) {
        return (
            <div>
                <h3> {cardData.name} </h3>
                <img src={cardData.images && cardData.images.small} alt={cardData.name} />
            </div>
        )
    }
    return false
}