import React, { useContext } from 'react';
import DisplayMeal from './DisplayMeal.js';
import { MealsContext } from './MealsProvider.js';
import { Link } from "react-router-dom";
import "./mealComponentStyle.css";

function MealsSearcher() {
    const mealsContext = useContext(MealsContext);

    return (
        <div>
            <p>
                List of our meals is as follows:
            </p>
            {!mealsContext.loading && mealsContext.error === null &&
                <div className="mealListContainer">
                    {mealsContext.mealList.map((meal) =>
                        <DisplayMeal key={meal.id} meal={meal} />
                    )}
                    <div className="addMealContainer mealItemContainer">
                        <span>
                            <Link to="/addMeal" title="Add a New Meal">+</Link>
                        </span>
                    </div>
                </div>
            }
            {mealsContext.loading && mealsContext.error === null &&
                <div>
                    Loading ....
                </div>
            }
            {mealsContext.error !== null &&
                <div>
                    {mealsContext.error.error}
                </div>
            }
        </div>
    )
}

export default MealsSearcher;