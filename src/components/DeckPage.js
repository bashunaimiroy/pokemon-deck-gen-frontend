import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardDetails from './CardDetails'
import CardList from './CardList'
import '../styles/components/DeckPage.scss'

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

    const pokemonCardInclusions = inclusions.filter(inclusion => inclusion.card_supertype === 'Pokémon')
    const trainerCardInclusions = inclusions.filter(inclusion => inclusion.card_supertype === 'Trainer')
    const energyCardInclusions = inclusions.filter(inclusion => inclusion.card_supertype === 'Energy')

    return (
        <div className="deck-page">
            <section>
                <h2>Deck #{id}</h2>
                <h3>Deck Type</h3>
                <p>{deck.pokemon_type}</p>
                <section>
                    <h3>Cards in Deck</h3>
                    <div className="deck-page__card-lists">
                        <div>
                            <h4>Pokemon Cards</h4>
                            <CardList inclusions={pokemonCardInclusions} showCardDetails={showCardDetails}></CardList>
                        </div>
                        <div>
                            <h4>Trainer Cards</h4>
                            <CardList inclusions={trainerCardInclusions} showCardDetails={showCardDetails}></CardList>
                        </div>
                        <div>
                            <h4>Energy Cards</h4>
                            <CardList inclusions={energyCardInclusions} showCardDetails={showCardDetails}></CardList>
                        </div>
                    </div>
                </section>

            </section>
            <section className="deck-page__card-details">
                {
                    currentCardId &&
                    <CardDetails cardId={currentCardId}></CardDetails>
                }
            </section>
        </div>
    );
}