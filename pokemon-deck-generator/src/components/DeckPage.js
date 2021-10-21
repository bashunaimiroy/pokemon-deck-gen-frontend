import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardDetails from './CardDetails'
import '../styles/DeckPage.scss'

export default function DeckPage() {
    let { id } = useParams();

    const [currentCardId, showCardDetails] = useState(null)
    const [inclusions, setInclusions] = useState([])
    const [deck, setDeck] = useState({})

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/v1/decks/' + id)
            .then(response => {
                setDeck(response.data.deck)
                setInclusions(response.data.inclusions)
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
                <h3>Cards in Deck</h3>
                <ul>
                    {inclusions.map(inclusion => <li key={inclusion.card_id}>{inclusion.quantity}x <button onClick={() => showCardDetails(inclusion.card_id)}>{inclusion.card_name}</button> - {inclusion.card_supertype} </li>)}
                </ul>
            </section>
        </div>
    );
}