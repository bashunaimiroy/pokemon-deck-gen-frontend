import '../styles/components/CardList.scss'

export default function CardList({ inclusions, showCardDetails }) {
    return (
        <ul className="card-list">
            {inclusions.map(inclusion =>
                <li className="card-list__item" key={inclusion.card_id}>
                    {inclusion.quantity}x 
                    <button className="card-list__show-button" onClick={() => showCardDetails(inclusion.card_id)}>
                        {inclusion.card_name}
                    </button>
                </li>
            )}
        </ul>
    )
}