import React from 'react';
import "./mealComponentStyle.css";

function DisplayMealDetails(props) {
    return (
        <>
            &nbsp;&nbsp;<b>Meal Details:</b>
            {props.error !== null &&
                <div>{props.error.error}</div>
            }
            {props.error === null && props.loading &&
                <div> Loading...</div>
            }
            {props.error === null && !props.loading && props.meal !== null &&
                <ul>
                    <li><b>Title:</b> {props.meal.title}</li>
                    <li><b>Description:</b> {props.meal.description}</li>
                    <li><b>Location:</b> {props.meal.location}</li>
                    <li><b>Max Reservation:</b> {props.meal.max_reservations}</li>
                    <li><b>Price:</b> {props.meal.price}</li>
                </ul>
            }
        </>
    );
}

export default DisplayMealDetails;