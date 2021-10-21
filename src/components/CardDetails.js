import { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/components/CardDetails.scss'
import apiUrl from '../constants/api';

const extractRelevantPropertyRows = (card) => {
    let props = [
        {
            label: "Card Type",
            value: card.supertype
        },
        {
            label: "Rules Text",
            value: (card.rules && card.rules.map(rule => <p>{rule}</p>)) || "N/A"
        },
        {
            label: "Rarity",
            value: card.rarity
        },
        {
            label: "Series",
            value: card.set.series
        },
        {
            label: "Set",
            value: card.set.name
        },

    ]
    if (card.supertype === "Pokémon") {
        const pokemonProps = [
            {
                label: "Evolves From",
                value: card.evolves_from || "None"
            },
            {
                label: "Pokemon Type",
                value: card.types.join(","),
            },
            {
                label: "HP",
                value: card.hp
            },
        ]
        props = props.concat(pokemonProps)
    }
    return props;
}


export default function CardDetails({ cardId }) {
    const [cardData, setCardData] = useState({})
    const [cardPropertyRows, setCardPropertyRows] = useState([])
    const [isLoading, setLoadingState] = useState(false);

    useEffect(() => {
        console.log(cardId)
        if (!cardId) { return; }
        setLoadingState(true)
        axios.get(`${apiUrl}/cards/${cardId}`)
            .then(response => {
                setLoadingState(false);
                setCardData(response.data.card)
                setCardPropertyRows(extractRelevantPropertyRows(response.data.card))
            })
    }, [cardId])

    if (isLoading) {
        return (
            <div>Loading Card Details...</div>
        )
    }
    if (cardData) {
        return (
            <article className="card-details">
                <header>
                    <h4 class="card-details__top-heading"> {cardData.name} </h4>
                </header>
                <img className="card-details__img" src={cardData.images && cardData.images.small} alt={cardData.name} />
                <h5 class="card-details__details-header">Card Details</h5>
                {cardPropertyRows.map(property => (
                    <div key={property.label}>
                        <h6 className="card-details__property-label">{property.label}</h6>
                        <div className="card-details__property-value">{property.value}</div>
                    </div>
                )
                )}
            </article>
        )
    }
    return false
}