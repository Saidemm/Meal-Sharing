/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import PropTypes from "prop-types";
import "./mealComponentStyle.css";
import React, { useState, useEffect } from 'react';
import Meals from './Meals.js';
import "./mealComponentStyle.css";

export const MealsContext = React.createContext({});

function MealsProvider() {
    const [mealList, setMealList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mealTitle, setMealTitle] = useState("");

    useEffect(() => {
        const fetchingMealsApi = async () => {
            const API_URL = `/api/meals?title=${mealTitle}`;
            try {
                setLoading(true);
                setError(null);

                const apiData = await fetch(API_URL);
                if (apiData.ok) {
                    const allMeals = await apiData.json();
                    setMealList(() => allMeals)
                } else {
                    const errorResult = await apiData.json();
                    console.log('Error in fetching data: ', errorResult.message);
                    setError(errorResult);
                }
                setLoading(false);
            } catch (error) {
                console.log('Error in fetching data: ', error.message);
                setError(error);
            }
        }
        fetchingMealsApi();
        console.log('searching');
    }, [mealTitle]);

    return (
        <MealsContext.Provider value={{ mealList: mealList, loading: loading, error: error, mealTitle: mealTitle, setMealTitle: setMealTitle}}>
            <Meals />
        </MealsContext.Provider>
    )
};

export default MealsProvider;