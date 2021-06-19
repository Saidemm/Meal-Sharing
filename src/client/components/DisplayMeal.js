import React from 'react';
import { Link, Router, Route, Switch, useParams } from "react-router-dom";
import "./mealComponentStyle.css";

function DisplayMeal(props) {
  return (
    <div class="mealItemContainer">
      <span>
        <Link to={`/meals/${props.meal.id}`}>
          {props.meal.title}
        </Link>
      </span>
    </div>
  );
}

export default DisplayMeal;