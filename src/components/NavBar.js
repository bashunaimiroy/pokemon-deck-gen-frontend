import { Link } from "react-router-dom";
import '../styles/components/NavBar.scss'

export default function NavBar(){
    return (
        <nav className="navbar">
            <ul className="navbar__links">
                <li className="navbar__link">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar__link">
                    <Link to="/deck-list">Decks</Link>
                </li>
                <li className="navbar__link">
                    <Link to="/deck-generator">Deck Generator</Link>
                </li>
            </ul>
        </nav>
    )

}