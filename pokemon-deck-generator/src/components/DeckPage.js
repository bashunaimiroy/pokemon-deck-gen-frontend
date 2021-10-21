import { useState, useEffect } from 'react';
import axios from 'axios'
import {
    useParams
} from 'react-router-dom'
import CardDetails from './CardDetails'

export default function DeckPage() {
    let { id } = useParams();

    const [currentCardId, expandCardDetails] = useState(null)
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState({})

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/v1/decks/' + id)
            .then(response => {
                setCards(response.data.cards)
                setDeck(response.data.deck)
            })
    }, [])

    return (
        <div>
            <section>
                <CardDetails cardId={currentCardId}></CardDetails>
            </section>
            <section>
                <h2>Deck Details for {id}</h2>
                <p> This deck is a {deck.pokemon_type} type deck </p>
                <ul>
                    {cards.map(card => <li key={card.id}>{card.quantity}x <button onClick={() => expandCardDetails(card.id)}>{card.name}</button> - {card.supertype} </li>)}
                </ul>
            </section>
        </div>
    );
}