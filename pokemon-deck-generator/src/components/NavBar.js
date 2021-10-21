import { Link } from "react-router-dom";
import '../styles/components/NavBar.scss'

export default function NavBar(){
    return (
        <nav class="navbar">
            <ul class="navbar__links">
                <li class="navbar__link">
                    <Link to="/">Home</Link>
                </li>
                <li class="navbar__link">
                    <Link to="/deck-list">Decks</Link>
                </li>
                <li class="navbar__link">
                    <Link to="/deck-generator">Deck Generator</Link>
                </li>
            </ul>
        </nav>
    )

}