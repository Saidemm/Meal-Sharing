const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const titles = await knex("meal").select("title");
    console.log(titles)
    response.send(titles);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});

router.get("/max-price", async (request, response) => {
  try {
    const maxPrice = parseFloat(request.query.maxPrice);
    console.log(maxPrice);
    if (isNaN(maxPrice)) {
      response.status(400).json({
        error: "maxPrice must be integers."
      });
      return;
    }
    const mealsLessThanMaxPrice = await knex("meal").where('price', '<', maxPrice);
    response.send(mealsLessThanMaxPrice);
    return;
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});

router.get("/availableReservations", async (request, response) => {
  try {
    let availableReservations = request.query.availableReservations;
    if (availableReservations = 'true') {
      const mealsHasAvailableReservations = await knex("meal")
        .select("meal.id", "meal.title", "meal.max_reservations")
        .sum({
          total_reserved: 'reservation.number_of_guests'
        })
        .leftJoin("reservation", "meal.id", "reservation.meal_id")
        .groupBy("meal.id")
        .having("meal.max_reservations", ">", "total_reserved")
      response.json(mealsHasAvailableReservations)
      return;
    }

  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});

router.get("/title", async (request, response) => {
  try {
    const title = request.query.title.toLowerCase();
    console.log({
      title
    })
    const mealWithTitle = await knex("meal")
      .where("meal.title", "Like", `%${title}%`);
    response.json(mealWithTitle);
    return;

  } catch (error) {
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});

router.get("/createdAfter", async (request, response) => {
  try {
    const createdAfter = new Date(request.query.createdAfter);
    if (!createdAfter.getDate()) {
      response.status(400).json({
        error: "Date is not valid!"
      })
    }

    const mealsCreatedAfterDate = await knex("meal")
      .where("created_date", ">=", createdAfter)
    response.json(mealsCreatedAfterDate);
    return;
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});


router.get("/limit", async (request, response) => {
  try {
    const numbersOfMeals = Number(request.query.limit);
    if (isNaN(numbersOfMeals)) {
      response.status(400).json({
        error: "limit must be integers."
      });
      return;
    }
    const limitedNumOfMeals = await knex("meal").limit(numbersOfMeals);
    response.json(limitedNumOfMeals)
    return;

  } catch (error) {
    response.status(500).send({
      error: "Internal Server Error."
    });
  }
});



//Adds a new meal

router.post('/', async (request, response) => {
  try {
    let newMeal = request.body;
    newMeal.when = new Date(newMeal.when);
    newMeal.created_date = new Date(newMeal.created_date);
    const newInsertedMeal = await knex("meal")
      .insert(request.body)
    response.end("New meal:" + JSON.stringify(newInsertedMeal))
  } catch (error) {
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
    const mealById = await knex("meal").where({
      id: mealId
    });
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