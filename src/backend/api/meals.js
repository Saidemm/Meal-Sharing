const express = require("express");
const router = express.Router();
const knex = require("../database");

function showMealsWithAvailableReservations(request) {
  if ("availableReservations" in request.query && request.query.availableReservations.trim().length!=0) {
    let availableReservations = request.query.availableReservations;
    if (availableReservations == 'true') {
      return true;
    }
  }
  return false;
}

function getMaxPrice(request) {
  if ("maxPrice" in request.query && request.query.maxPrice.trim().length!=0) {
    const maxPrice = parseFloat(request.query.maxPrice.trim());
    if (isNaN(maxPrice)) {
      throw {
        type: "Invalid Input Param",
        message: "Invalid input: maxPrice must be a number."
      }
    }
    return maxPrice;
  } else {
    return null;
  }
}

function getPartialTitle(request) {
  if ("title" in request.query && request.query.title.trim().length!=0) {
    const title = request.query.title.toLowerCase();
    return title;
  } else {
    return null;
  }
}

function getCreatedAfterDate(request) {
  if ("createdAfter" in request.query && request.query.createdAfter.trim().length!=0) {
    if (request.query.createdAfter == '') {
      return null;
    }
    const createdAfter = new Date(request.query.createdAfter);
    if (createdAfter == null) {
      throw {
        type: "Invalid Input Param",
        message: "Invalid input: createdAfter is not a date value"
      }
    }
    return createdAfter;
  } else {
    return null;
  }
}

function getLimit(request) {
  if ("limit" in request.query && request.query.limit.trim().length!=0) {
    const limit = parseInt(request.query.limit);
    if (isNaN(limit)) {
      throw {
        type: "Invalid Input Param",
        message: "Invalid input: limit must be an integer."
      }
    }
    return limit;
  } else {
    return null;
  }
}

router.get("/", async (request, response) => {
  try {
    let dbQuery = "select * from meal";
    let dbQueryParams = [];
    let whereAddedToQuery = false;

    // Handling showing meals with available reservations
    if (showMealsWithAvailableReservations(request)) {
      dbQuery = `select meal.*
        from (SELECT meal.*, (meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0)) AS available_reservations
        FROM meal
        LEFT JOIN reservation
        ON meal.id = reservation.meal_id
        GROUP BY meal.id
        HAVING available_reservations > 0) meal`;
    }

    // Handling maxPrice query param
    const maxPrice = getMaxPrice(request);
    if (maxPrice != null) {
      dbQuery += (whereAddedToQuery ? " and" : " where") + " price < ?";
      dbQueryParams[dbQueryParams.length] = maxPrice;
      whereAddedToQuery = true;
    }

    // Handling title query param
    const partialTitle = getPartialTitle(request);
    if (partialTitle != null) {
      dbQuery += (whereAddedToQuery ? " and" : " where") + " LOWER(title) like ?";
      dbQueryParams[dbQueryParams.length] = '%' + partialTitle + '%';
      whereAddedToQuery = true;
    }

    // Handling createdAfter query param
    const createdAfterDate = getCreatedAfterDate(request);
    if (createdAfterDate != null) {
      dbQuery += (whereAddedToQuery ? " and" : " where") + " created_date > ?";
      dbQueryParams[dbQueryParams.length] = createdAfterDate;
      whereAddedToQuery = true;
    }

    // Handling limit query param
    const limit = getLimit(request);
    if (limit != null) {
      dbQuery += " limit ?";
      dbQueryParams[dbQueryParams.length] = limit;
    }

    let meals = await knex.raw(dbQuery, dbQueryParams);
    response.send(meals[0]);
  } catch (error) {
    console.log(error.message);
    if (error.type == 'Invalid Input Param') {
      response.status(400).send({
        error: error.message
      });
    } else {
      response.status(500).send({
        error: "Internal Server Error."
      });
    }
  }
});

//Adds a new meal
router.post('/', async (request, response) => {
  try {
    let newMeal = request.body;
    if(newMeal.title == null || newMeal.title.trim() == ''){
      response.status(400).send({
        error: "Meal title is mandatory."
      });
      return;
    }
    else if(newMeal.location == null || newMeal.location.trim() == ''){
      response.status(400).send({
        error: "Meal location is mandatory."
      });
    }
    else if(newMeal.max_reservations == null || newMeal.max_reservations.trim() == ''){
      response.status(400).send({
        error: "Meal max_reservations is mandatory."
      });
    }
    else if(newMeal.when == null || newMeal.when.trim() == ''){
      response.status(400).send({
        error: "Meal 'when' field is mandatory."
      });
    }

    newMeal.when = new Date(newMeal.when);
    newMeal.created_date = new Date();
    const newInsertedMeal = await knex("meal")
      .insert(newMeal);
    response.send("New meal:" + JSON.stringify(newInsertedMeal));
  } catch (error) {
    console.log(error);
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
})

// This part returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      response.status(400).json({
        error: "limit must be integers."
      });
      return;
    }
    const mealQueryResult = await knex("meal").where({
      id: mealId
    });
    if(mealQueryResult.length == 0){
      response.status(404).json({
        error: "No such meal found!"
      });
      return;
    }
    const mealById = mealQueryResult[0];
    const reservedGuestCount = await knex("meal")
      .join("reservation", "reservation.meal_id", "meal.id")
      .sum("reservation.number_of_guests as guestCount")
      .where("meal.id", mealId)
      .first();
    mealById.canBeReserved = (mealById.max_reservations - reservedGuestCount.guestCount) > 0;
    
    response.json(mealById);

  } catch (error) {
    response.status(500).send({
      error: "Internal Server Error."
    });
  }

})

// This part updates meal by id
router.put("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      response.status(400).json({
        error: "limit must be integers."
      });
      return;
    }
    const updatedMeal = await knex("meal").where({
      id: mealId
    }).update(request.body);
    response.end("Update was done Successfully!" + JSON.stringify(updatedMeal))
  } catch (error) {
    response.status(500).send({
      error: "Internal Server Error."
    });
  }

})

//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      response.status(400).json({
        error: "limit must be integers."
      });
      return;
    }

    const deletedMeal = await knex("meal").where({
      id: mealId
    }).del();
    response.end("Deleted meal:" + JSON.stringify(deletedMeal))

  } catch (error) {
    response.status(500).send({
      error: "Internal Server Error."
    });
  }

})
module.exports = router;