import React from "react";
import DeckList from "./components/DeckList";
import DeckGenerator from "./components/DeckGenerator";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DeckPage from "./components/DeckPage";
  
  export default function PokemonGeneratorApp() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/deck-list">
              <DeckList />
            </Route>
            <Route path="/deck-generator">
              <DeckGenerator />
            </Route>
            <Route path="/decks/:id">
              <DeckPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
 
  