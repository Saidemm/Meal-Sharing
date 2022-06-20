import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DisplayMealDetails from './DisplayMealDetails.js';
import ReserveMeal from './ReserveMeal.js';
import ReviewMeal from './ReviewMeal.js';
import "./mealComponentStyle.css";

function MealDetailsProvider() {
    const { mealId } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchingMealsApi = async () => {
            const API_URL = `/api/meals/${mealId}`;
            try {
                setLoading(true);
                setError(null);
                // To make a delay to show loading a bit longer
                //const delay = ms => new Promise(res => setTimeout(res, ms));
                //await delay(5000);
                const apiData = await fetch(API_URL);
                if (apiData.ok) {
                    const mealInfo = await apiData.json();
                    setMeal(() => mealInfo)
                } else {
                    const errorResult = await apiData.json();
                    console.log('Error in fetching meal info: ', errorResult.message);
                    setError(errorResult);
                }
                setLoading(false);
            } catch (error) {
                console.log('Error in fetching meal info: ', error.message);
                setError(error);
            }
        }
        fetchingMealsApi();
    }, []);

    return (
        <div className="mealDetailsPageContainer">
            <Link to='/meals' title="Go Back to Meals">&lt;&lt;</Link>
            <DisplayMealDetails meal={meal} loading={loading} error={error} />
            {meal !== null && !meal.canBeReserved &&
                <span className="reserveMessage">The meal is fully booked. The reservation is not possible for this Meal!</span>
            }
            {meal !== null && meal.canBeReserved &&
                <ReserveMeal meal={meal} />
            }
            {meal !== null && 
                <ReviewMeal meal={meal}/>
            }   
        </div>
    );
}

export default MealDetailsProvider;

