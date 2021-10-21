import { useState, useEffect } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';


export default function DeckList() {
    
    const [isLoading, setLoadingState] = useState(false)
    const [decks, setDecks] = useState([])

    useEffect(() => {
        Axios.get('http://127.0.0.1:3000/v1/decks/')
        setLoadingState(true)
        .then(response => {
            setDecks(response.data.payload.decks.reverse())
            setLoadingState(false)
        })
    }, [])    
    const shouldDisplayDecks = !isLoading && !!decks.length;
    const shouldDisplayLoader = isLoading;
    const displayNoDecksFound = !isLoading && !decks.length;

    return (
      <div>
        <h2>Decks</h2>
        <ul>
            {decks.map((deck) => <li key={deck.id}>
                <Link to={`/decks/${deck.id}`}>Deck #{deck.id}</Link>
            </li>)}
        </ul>
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