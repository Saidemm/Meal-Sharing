import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/NavBar.js";
import About from "./components/About.js";
import MealsProvider from './components/MealsProvider.js';
import MealDetailsProvider from './components/MealDetailsProvider.js';
import AddMeal from "./components/AddMeal.js";
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
              <h1>Unforgettable, Immersive Culinary Experiences</h1>
              <p>
                Welcome to my meal-sharing App which is to show-case some of the capabilities of React and Node.js.
                You can view meals, add a new meal or reserve a a meal.
                Go to 'Our-Meals' and check them out out.
              </p>
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


const Home = () => (
  <section className="home-component">
    <h1>Home</h1>
  </section>
)


export default App;
