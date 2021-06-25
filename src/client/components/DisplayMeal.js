import React from 'react';
import { Link } from "react-router-dom";
import "./mealComponentStyle.css";

function DisplayMeal(props) {
  const meal_img_mapping = {
    "Homemade Pasta": "meal_img_1",
    "Homemade Gnocchi": "meal_img_2",
    "Homemade spagetti": "meal_img_3",
    "Authentic Tortellini": "meal_img_4",
    "Authentic Tortellini Soup": "meal_img_5",
    "Saffron Cake (Tahchin)": "meal_img_6",
  };
  function getRelevantMealImgClass(mealTitle) {
    return meal_img_mapping[mealTitle] != null ? meal_img_mapping[mealTitle] : "meal_img_other";
  }

  return (
    <Link to={`/meals/${props.meal.id}`}>
      <div className={`mealItemContainer ${getRelevantMealImgClass(props.meal.title)}`}>
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