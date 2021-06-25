import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./mealComponentStyle.css";

function AddMeal() {
    const [formData, setFormData] = useState({ when: undefined });
    const [storing, setStoring] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function postNewMeal() {
        (async () => {
            try {
                setError(null);
                setStoring(true);
                setSuccess(false);
                const response = await fetch('/api/meals', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    setSuccess(true);
                } else {
                    const errorResult = await response.json();
                    console.log('Storing meal failed: ', errorResult);
                    setError(errorResult);
                }
            }
            catch (error) {
                console.log('Error in storing new meal: ', error.message);
                setError(error);
            }
            setStoring(false);
        })();
    }

    function updateFormData(fieldName, fieldValue) {
        let newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    return (
        <div className="addMealPageContainer">
            <Link to='/meals'>&lt;&lt;</Link>
            {error !== null &&
                <div className="errorMessageContainer">Storing Meal failed: {error.error}<br /><br /></div>
            }
            {error === null && success &&
                <div className="successMessageContainer">The new meal was stored successfully!<br /><br /></div>
            }
            {error === null && !success &&
                <div>Please fill-out the form and press "Store Meal" button to store a new meal in system.<br /><br /></div>
            }

            <input type="text" value={formData.title} onChange={e => updateFormData("title", e.target.value)} placeholder="Title" />
            <br /><br />
            <textarea type="text" value={formData.description} onChange={e => updateFormData("description", e.target.value)} placeholder="Description" />
            <br /><br />
            <input type="text" value={formData.location} onChange={e => updateFormData("location", e.target.value)} placeholder="Location" />
            <br /><br />
            <input type="date" value={formData.when} onChange={e => updateFormData("when", e.target.value)} placeholder="When" />
            <br /><br />
            <input type="number" value={formData.max_reservations} onChange={e => updateFormData("max_reservations", e.target.value)} placeholder="Max_reservations" />
            <br /><br />
            <input type="number" value={formData.price} onChange={e => updateFormData("price", e.target.value)} placeholder="Price" />
            <br /><br />
            <button onClick={postNewMeal}>Store Meal</button>
            {storing &&
                <span>&nbsp;Storing New Meal...</span>}
            <br /><br />
        </div>
    )
}

export default AddMeal;