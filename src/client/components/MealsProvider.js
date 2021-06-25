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
    const [mealFilter, setMealFilter] = useState({title:"", maxPrice:"", availableReservations:"", createdAfter:""});

    useEffect(() => {
        const fetchingMealsApi = async () => {
            const API_URL = `/api/meals?title=${mealFilter.title}&maxPrice=${mealFilter.maxPrice}&availableReservations=${mealFilter.availableReservations}&createdAfter=${mealFilter.createdAfter}&limit=50`;
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
    }, [mealFilter]);

    return (
        <MealsContext.Provider value={{ mealList: mealList, loading: loading, error: error, mealFilter: mealFilter, setMealFilter: setMealFilter}}>
            <Meals />
        </MealsContext.Provider>
    )
};

export default MealsProvider;