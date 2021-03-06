import React, { useState } from "react";
import "./mealComponentStyle.css";

function ReviewMeal(props) {
    console.log(props)
    const [formData, setFormData] = useState({ meal_id: props.meal.id});

    const [reviewing, setReviewing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    function reviewMeal(){
        (async() => {
            try {
                setError(null);
                setReviewing(true);
                setSuccess(false);
                const response = await fetch('/api/reviews', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(formData)

                }); 
                if(response.ok) {
                    setSuccess(true);
                } else {
                    const errorResult = await response.json();
                    console.log(errorResult);
                    console.log("Reviewing the meal failed!", errorResult.message);
                    setError(errorResult)
                }

            }
            catch (error) {
                console.log('Error in reviewing the meal: ', error.message);
                setError(error);
            }
            setReviewing(false);
        })();

    }
    function updateFormData(fieldName, fieldValue) {
        let newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    return (
        <>
            <br /><br />
            {error !== null &&
                <div className="errorMessageContainer">Reviewing the Meal failed: {error.error}<br /><br /></div>
            }
            {error === null && success &&
                <div className="successMessageContainer">The reviewing was done successfully!<br /><br /></div>
            }
            {error === null && !success &&
                <div>Please help us by giving a review to the meal above.<br /><br /></div>
            }
            <input type="text" value={formData.title} onChange={e => updateFormData("title", e.target.value)} placeholder="title" />
            <br /><br />
            <select type="number" value={formData.stars} onChange={e => updateFormData("stars", e.target.value)} placeholder="Stars" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br /><br />
            <textarea type="text" value={formData.description} onChange={e => updateFormData("description", e.target.value)} placeholder="description" />
            <br /><br />

            <button onClick={reviewMeal}>Review Meal</button>
            {reviewing &&
                <span>&nbsp;Reviewing the Meal...</span>}
            <br /><br />
        </>
    )
}


export default ReviewMeal;


