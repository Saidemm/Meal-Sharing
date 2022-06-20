import React from "react";
import "./HomeComponent.css";
import MealAutocompleteProvider from "./MealAutocompleteProvider.js";


const Home = () => (
    <section>
        <div className="homeComponent">
          <div className="homeContent">
            <h1>Unforgettable, Immersive Culinary Experiences</h1>
            <p>
              Welcome to my meal-sharing App which is to show-case some of the capabilities of React and Node.js.
              You can view meals, add a new meal or reserve a meal.
              Go to 'Our-Meals' and check them out.
            </p>
            <div>
              <h3>Search for your favorite meal:</h3>
              <MealAutocompleteProvider />
            </div>
          </div>
        </div>
    </section>
)

export default Home;