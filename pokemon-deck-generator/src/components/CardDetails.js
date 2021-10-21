import { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/components/CardDetails.scss'
    const extractRelevantPropertyRows = (card) => {
        let props = [
        {
            label: "Card Type",
            value: card.supertype
        },
        {
            label: "Rules Text",
            value: card.rules && card.rules.join('\n') || "N/A"
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
                value: card.evolves_from
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
        axios.get('http://127.0.0.1:3000/v1/cards/' + cardId)
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
                    <h4> {cardData.name} </h4>
                </header>
                <img className="card-details__img" src={cardData.images && cardData.images.small} alt={cardData.name} />
                <h5>Card Details</h5>
                <table className="card-details__table">
                    <tbody>
                    {cardPropertyRows.map(property => (
                        <tr key={property.label}>
                            <td className="card-details__property-label">{property.label}</td>
                            <td className="card-details__property-value">{property.value}</td>
                        </tr>
                    )
                    )}
                    </tbody>
                </table>
            </article>
        )
    }
    return false
}