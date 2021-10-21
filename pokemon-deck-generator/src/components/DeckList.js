import { useState, useEffect } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';


export default function DeckList() {
    
    const [decks, setDecks] = useState([])

    useEffect(() => {
        Axios.get('http://127.0.0.1:3000/v1/decks/')
        .then(response => {
            setDecks(response.data.payload.decks.reverse())
        })
    }, [])    

    return (
      <div>
        <h2>Decks</h2>
        <ul>
            {decks.map((deck) => <li key={deck.id}>
                <Link to={`/decks/${deck.id}`}>Deck #{deck.id}</Link>
            </li>)}
        </ul>
      </div>
    );
  }