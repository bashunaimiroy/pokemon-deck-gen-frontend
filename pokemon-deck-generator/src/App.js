import React from "react";
import DeckList from "./components/DeckList";
import Generator from "./components/Generator";
import HomePage from "./components/HomePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DeckPage from "./components/DeckPage";
  
  export default function PokemonGeneratorApp() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/deckList">DeckList</Link>
            </li>
            <li>
              <Link to="/generator">Generator</Link>
            </li>
          </ul>
  
          <hr />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/deckList">
              <DeckList />
            </Route>
            <Route path="/generator">
              <Generator />
            </Route>
            <Route path="/decks/:id">
              <DeckPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
 
  