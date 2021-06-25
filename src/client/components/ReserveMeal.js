import React, { useState } from "react";
import "./mealComponentStyle.css";

function ReserveMeal(props) {
    const [formData, setFormData] = useState({ meal_id: props.meal.id, number_of_guests: 1 });

    const [reserving, setReserving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function reserveMeal() {
        (async () => {
            try {
                setError(null);
                setReserving(true);
                setSuccess(false);
                const response = await fetch('/api/reservations', {
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
                    console.log('Reserving meal failed: ', errorResult);
                    setError(errorResult);
                }
            }
            catch (error) {
                console.log('Error in reserving new meal: ', error.message);
                setError(error);
            }
            setReserving(false);
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
                <div className="errorMessageContainer">Reserving the Meal failed: {error.error}<br /><br /></div>
            }
            {error === null && success &&
                <div className="successMessageContainer">The reservation was done successfully!<br /><br /></div>
            }
            {error === null && !success &&
                <div>Please fill-out the form and press "Reserve Meal" button to reserve the meal above.<br /><br /></div>
            }

            <input type="text" value={formData.contact_name} onChange={e => updateFormData("contact_name", e.target.value)} placeholder="Name" />
            <br /><br />
            <input type="text" value={formData.contact_phonenumber} onChange={e => updateFormData("contact_phonenumber", e.target.value)} placeholder="Phone Number" />
            <br /><br />
            <input type="email" value={formData.contact_email} onChange={e => updateFormData("contact_email", e.target.value)} placeholder="Email" />
            <br /><br />

            <button onClick={reserveMeal}>Reserve Meal</button>
            {reserving &&
                <span>&nbsp;Reserving the Meal...</span>}
            <br /><br />
        </>
    )
}

export default ReserveMeal;