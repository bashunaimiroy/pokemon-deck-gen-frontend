import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import pokemonTypes from "../constants/pokemonTypes";
import apiUrl from '../constants/api';

import '../styles/components/DeckGenerator.scss'

export default function DeckGenerator() {
    const [isLoading, setLoadingState] = useState(false)
    const [deck, setDeck] = useState(null)
    const [pokemonType, setPokemonType] = useState(pokemonTypes[0])
    const [numberOfPokemon, setNumberOfPokemon] = useState(12)

    const handleGeneratedDeck = deck => {
        setDeck(deck)
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        setLoadingState(true)
        // Generate Deck
        const postData = {
            pokemon_type: pokemonType,
            number_of_pokemon: numberOfPokemon
        }
        axios.post(`${apiUrl}/decks`, postData)
            .then(response => {
                setLoadingState(false)
                handleGeneratedDeck(response.data.deck)
            })
    }
    
    const shouldDisplayLoader = isLoading;
    const shouldDisplayDeck = !isLoading && deck;
    const shouldDisplayForm = !isLoading && !deck;
    return (
      <div>
        <h2>Deck Generator</h2>
        {shouldDisplayForm &&
            <form className="form" onSubmit={handleFormSubmit}>
                <fieldset className="form__fieldset">
                    <label className="form__label" htmlFor="pokemon_type">Select Pokemon Type</label>
                    <select id="pokemon_type" value={pokemonType} onChange={e => setPokemonType(e.target.value)}>
                        {pokemonTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </fieldset>
                <fieldset className="form__fieldset">
                    <label className="form__label" htmlFor="number_of_cards">Select number of Pokemon Cards in deck</label>
                    <input id="number_of_cards" type="range" min="12" max="16" value={numberOfPokemon} onChange={e => setNumberOfPokemon(e.target.value)}>

                    </input>
                    <strong>{numberOfPokemon}</strong>
                </fieldset>
                <div className="form__controls">
                    <button className="btn btn--primary" type="submit">Generate Deck</button>
                </div>
            </form>
        }
        {shouldDisplayDeck &&
            <div>
                <h3>Deck Generated! Deck ID is #{deck.id}</h3>
                <div>
                    <Link to={`/decks/${deck.id}`}>Click Here to View</Link>
                </div>
            </div>
        }
        {shouldDisplayLoader &&
            <div>Generating a {pokemonType}-type deck with { numberOfPokemon } Pokemon in it...</div>
        }

      </div>
    );
  }