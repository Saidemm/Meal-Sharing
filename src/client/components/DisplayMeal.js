import React from 'react';
import { Link } from "react-router-dom";
import "./mealComponentStyle.css";

function DisplayMeal(props) {
  return (
    <Link to={`/meals/${props.meal.id}`}>
      <div className={`mealItemContainer meal_img_${props.index>5?'other':props.index + 1}`}>
        <span>
        </span>
      </div>
      <div className="mealTitleContainer">
        {props.meal.title}
      </div>
    </Link>
  );
}

export default DisplayMeal;