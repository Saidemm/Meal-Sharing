import React, { useState, useEffect, useRef } from 'react';
import MealAutocompleteSearcher from './MealAutocompleteSearcher.js';

export const MealAutocompleteContext = React.createContext({});


function MealAutocompleteProvider() {
    const [mealList, setMealList] = useState([]);
    const [inputMeal, setInputMeal] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const lastInputMeal = useRef(inputMeal);

    useEffect (() => {
        const mealfetch = async() => {
            const API_URL = `/api/meals?limit=5&title=${inputMeal}`
            try{
                setLoading(true);
                setError(null);
                const apiData = await fetch(API_URL);
                if(apiData.ok) {
                    const meals = await apiData.json();
                    console.log(meals);
                    setMealList(meals);
                } else {
                    const errorResult = await apiData.json();
                    setError(errorResult);
                }
                setLoading(false);
            } 
            catch(error){
                setError(error);
            }
        }

        if(inputMeal !== null && inputMeal !== "" && inputMeal !== lastInputMeal.current) {
            mealfetch();
            lastInputMeal.current = inputMeal;
        }
    },[inputMeal,lastInputMeal]);
    
    return (
        <MealAutocompleteContext.Provider value = {{mealList: mealList, inputMeal: inputMeal, setInputMeal: setInputMeal, loading: loading, error: error}}>
            <MealAutocompleteSearcher />
        </MealAutocompleteContext.Provider>
    )

}

export default MealAutocompleteProvider;