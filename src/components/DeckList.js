import { useState, useEffect } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom';
import pokemonTypes from "../constants/pokemonTypes"
import apiUrl from "../constants/api"
import '../styles/components/DeckList.scss'


export default function DeckList() {
    
    const [isLoading, setLoadingState] = useState(false)
    const [pokemonTypeFilter, setPokemonTypeFilter] = useState("")
    const [decks, setDecks] = useState([])

    useEffect(() => {
        setLoadingState(true)
        
        const params = {}
        if (pokemonTypeFilter){
          params.filter_by_pokemon_type = pokemonTypeFilter
        }

        axios.get(`${apiUrl}/decks`, { params })
        .then(response => {
            setLoadingState(false)
            setDecks(response.data.decks.reverse())
        })
    }, [pokemonTypeFilter])    

    const shouldDisplayDecks = !isLoading && !!decks.length;
    const shouldDisplayLoader = isLoading;
    const displayNoDecksFound = !isLoading && !decks.length;

    return (
      <div>
        <h2>Decks</h2>
        <div className="deck-list__filters">
          <label className="form__label" htmlFor="filter_by_pokemon_type">Filter By Pokemon Type</label>
          <select id="filter_by_pokemon_type" value={pokemonTypeFilter} onChange={e => setPokemonTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              {pokemonTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        {
          shouldDisplayLoader && 
          <div>Loading Decks...</div>
        }

        {shouldDisplayDecks &&
          <ul>
              {decks.map((deck) => <li key={deck.id}>
                  <Link to={`/decks/${deck.id}`}>Deck #{deck.id} - {deck.pokemon_type}</Link>
              </li>)}
          </ul>
        }

        {displayNoDecksFound &&
          <div>
            No Decks Found.
          </div>
        }
      </div>
    );
  }