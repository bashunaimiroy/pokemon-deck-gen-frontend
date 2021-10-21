import '../styles/components/CardList.scss'

export default function CardList({ inclusions, showCardDetails }) {
    return (
        <ul class="card-list">
            {inclusions.map(inclusion =>
                <li class="card-list__item" key={inclusion.card_id}>
                    {inclusion.quantity}x
                    <button class="card-list__show-button" onClick={() => showCardDetails(inclusion.card_id)}>
                        {inclusion.card_name}
                    </button>
                    - {inclusion.card_supertype}
                </li>
            )}
        </ul>
    )
}