import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Meals from "./components/MealsProvider.js";
import Nav from "./components/NavBar.js";
import About from "./components/About.js";
import MealsSearcherProvider from './components/MealsProvider.js';
// import Nav from "./components/Meals.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}>
            <Nav />
            <h1>Unforgettable, immersive culinary experiences</h1>

          </Route>
          <Route exact path="/About" component={About}>
            <About />
          </Route>
          <Route exact path="/Meals">
            
            <MealsSearcherProvider />
          
          </Route>
        </Switch>
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
