import React, { useState, useContext } from 'react';
import DisplayMeal from './DisplayMeal.js';
import { MealsContext } from './MealsProvider.js';
import { Link } from "react-router-dom";
import "./mealComponentStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function Meals() {
    const mealsContext = useContext(MealsContext);

    const [displayFilters, setDisplayFilters] = useState(false);

    function updateFilterObject(filterField, newValue){
        let newFilterObject = {...mealsContext.mealFilter};
        newFilterObject[filterField] = newValue;
        mealsContext.setMealFilter(newFilterObject);
    }

    return (
        <div className="mealPageContainer">
            <div className="mealHeaderContainer">
                <div>
                    <p>
                        <b>Our meal list:</b>
                    </p>
                </div>
                <div>
                    <div className="filterButton" onClick={() => setDisplayFilters(true)}>
                        Filters&nbsp;
                        <FontAwesomeIcon icon={faFilter} />
                    </div>
                </div>
            </div>
            <hr className='mealSearchHR'></hr>
            {displayFilters &&
                <>
                    <div className='mealFieldsContainer'>
                        <input type="text" onChange={e => updateFilterObject("title", e.target.value)} placeholder="Meal Title" />
                        <input type="number" onChange={e => updateFilterObject("maxPrice", e.target.value)} placeholder="Max Price" />
                        <input type="date" onChange={e => updateFilterObject("createdAfter", e.target.value)} placeholder="Created After" />
                        <span>
                            <input type="checkbox" onChange={e => updateFilterObject("availableReservations", e.target.checked)}/> Available to Reserve
                        </span>
                    </div>
                    <hr className='mealSearchHR'></hr>
                </>
            }
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
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
                    <div className="mealItemContainer mealItemContainerEmptyCell"/>
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