import { useState, useEffect } from 'react';
import Axios from 'axios'

export default function CardDetails({ cardId }) {
    const [cardData, setCardData] = useState({})

    useEffect(() => {
        console.log(cardId)
        if (!cardId) { return; }
        Axios.get('http://127.0.0.1:3000/v1/cards/' + cardId)
            .then(response => {
                setCardData(response.data.payload.card)
            })
    }, [cardId])

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