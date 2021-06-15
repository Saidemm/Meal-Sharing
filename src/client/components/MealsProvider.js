/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import PropTypes from "prop-types";
import "./mealComponentStyle.css";
import React, { useState, useEffect } from 'react';
import Meals from './Meals.js';

export const MealsContext = React.createContext({});

function MealsSearcherProvider(){ 
    console.log("testing if it enters provider");
    const [mealsList, setMealsList] = useState([]);;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() =>{
        const fetchingMealsApi = async() => {
            const API_URL = 'http://localhost:3000/api/meals';
            try{
                setLoading(true);
                setError(null);
                // To make a delay to show loading a bit longer
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(5000);
                const apiData = await fetch(API_URL);
                if(apiData.ok){
                    const fetchedResult = await apiData.json();
                    const mealsApi = fetchedResult.title;
                    setMealsList(() =>  mealsApi)
                    console.log(meals, mealsList)
                } else {
                    const errorResult = await apiData.json();
                    console.log('Error in fetching data: ', errorResult.message);
                    setError(errorResult);
                }
                setLoading(false);
            } catch(error){
                setError(error);
            }
        }
        console.log("before fetching");
        fetchingMealsApi();
        console.log("after fetching");
    }, []);

    console.log({mealsList: mealsList, loading: loading, error: error});
    
    return (
        <div>
            Hi page loaded!
        </div>
    )
    /*
    return (
        <MealsContext.Provider value = {{mealsList: mealsList, loading: loading, error: error}}>
            <Meals />
        </MealsContext.Provider>
    )*/
};

export default MealsSearcherProvider;