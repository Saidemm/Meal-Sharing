import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/NavBar.js";
import About from "./components/About.js";
import MealsProvider from './components/MealsProvider.js';
import MealDetailsProvider from './components/MealDetailsProvider.js';
import AddMeal from "./components/AddMeal.js";
import Home from "./components/HomeComponent.js";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="mainPageContainer">
        <Route path="/">
          <Nav />
        </Route>
        <div className="contentContainer">
          <Switch>
            <Route exact path="/addMeal">
              <AddMeal />
            </Route>
            <Route exact path="/about" component={About}>
              <About />
            </Route>
            <Route exact path="/meals"  >
              <MealsProvider />
            </Route>
            <Route exact path="/meals/:mealId">
              <MealDetailsProvider />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Route path="/">
          <div className="footer">
          </div>
        </Route>
      </div>
    </Router>
  );
}





export default App;
