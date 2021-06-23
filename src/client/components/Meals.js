import React, { useContext } from 'react';
import DisplayMeal from './DisplayMeal.js';
import { MealsContext } from './MealsProvider.js';
import { Link } from "react-router-dom";
import "./mealComponentStyle.css";

function Meals() {
    const mealsContext = useContext(MealsContext);

    return (
        <div className="mealPageContainer">
            <p>
                List of our meals is as follows:
            </p>
            {!mealsContext.loading && mealsContext.error === null &&
                <div className="mealListContainer">
                    {mealsContext.mealList.map((meal, index) =>
                        <DisplayMeal key={meal.id} meal={meal} index={index} />
                    )}
                    <Link to="/addMeal" title="Add a New Meal">
                        <div className="addMealContainer mealItemContainer">
                            <span>
                                +
                            </span>
                        </div>
                    </Link>
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

export default Meals;