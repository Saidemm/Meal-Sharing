/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import PropTypes from "prop-types";
import "./mealComponentStyle.css";
import React, { useState, useEffect } from 'react';
import Meals from './Meals.js';
import "./mealComponentStyle.css";

export const MealsContext = React.createContext({});

function MealsProvider() {
    const [mealList, setMealList] = useState([]);;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchingMealsApi = async () => {
            const API_URL = 'http://localhost:5000/api/meals';
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
    }, []);

    return (
        <MealsContext.Provider value={{ mealList: mealList, loading: loading, error: error }}>
            <Meals />
        </MealsContext.Provider>
    )
};

export default MealsProvider;