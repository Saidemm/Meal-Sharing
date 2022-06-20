import React, { useState,useContext } from 'react';
import { Link } from "react-router-dom";
import {MealAutocompleteContext} from './MealAutocompleteProvider.js';
import "./HomeComponent.css";


function MealAutocompleteSearcher(){
    const mealContext = useContext(MealAutocompleteContext);

    const [suggestionApplied, setSuggestionApplied] = useState(null);

    function getHighlightSuggestion(title, searchQuery){
        const myReg = new RegExp(searchQuery, 'gi');
        const matchResult = title.match(myReg);
        
        return (
            <> 
                {title.split(myReg)
                    .map((item, index) => 
                        <>
                            {index!==0 && 
                                <b>{matchResult[index-1]}</b>
                            }
                            {item}
                        </>
                    )}
            </>
        );
    }

    function applySuggestion(meal){
        mealContext.setInputMeal(meal.title);
        setSuggestionApplied(meal);
    }

    function inputMealChanged(e){
        mealContext.setInputMeal(e.target.value);
        setSuggestionApplied(null);
    }

    return (
        <div>
            <span className="inputContainer">
                <input class="inputText" type="text" value={mealContext.inputMeal}
                    onChange= {(e) => inputMealChanged(e)}
                    placeholder="Search for a meal"/>
                <span></span>
            </span>
            

            {suggestionApplied !==null &&
                <Link to={`/meals/${suggestionApplied.id}`}>
                    &nbsp;<button className="autocompletedInputMealButton">Check Meal Details</button>
                </Link>
            }

            {!mealContext.loading && mealContext.error === null && mealContext.mealList.length > 0 && suggestionApplied === null &&
                <div className="autoCompleteContainer">
                    <div className="autoCompleteFrame">
                        {mealContext.mealList.map((meal) => 
                                <div className="autoCompleteItem" onClick={(e) => applySuggestion(meal)}>
                                    {getHighlightSuggestion(meal.title, mealContext.inputMeal)}
                                </div>
                            )}
                    </div>
                </div>
            }
            {!mealContext.loading && mealContext.error === null && mealContext.mealList.length === 0 && mealContext.inputMeal!=="" &&
                <div className="autoCompleteContainer">
                    <div className="autoCompleteFrame">
                        No Result!
                    </div>
                </div>
            }
            {mealContext.loading && mealContext.error === null && 
                <div>
                    Loading ....
                </div>
            }
            {mealContext.error !== null && 
                <div>
                    {mealContext.error.message}
                </div>
            }
        </div>       
    )
}

export default MealAutocompleteSearcher;