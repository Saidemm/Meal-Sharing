const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get('/', async (request, response) => {
    try {
        const reviews = await knex('review')
        response.send(reviews);
    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

router.post('/', async (request, response) => {
    try {
        
        let newReview = request.body;
        console.log("reaching meal", newReview);
        if(newReview.title == null || newReview.title.trim().length == 0){
            response.status(400).send({
                error: "Title is mandatory."
            });
            return;
        }
        else if(newReview.stars == null || newReview.stars.trim().length == 0){
            response.status(400).send({
                error: "Stars is mandatory."
            });
            return;
        }
        

        newReview.created_date = new Date();
        await knex("review")
            .insert(newReview)
        response.status(201).json("review has been added");
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});



router.get('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            response.status(400).json({
                error: "limit must be integers."
            });
            return;
        }
        const reviewWithId = await knex("review")
            .where({
                id: id
            });
        response.json(reviewWithId);
    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

//Updates the review by id
router.put('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        console.log(id, request.body)

        if (isNaN(id)) {
            response.status(400).json({
                error: "id must be integers."
            });
            return;
        }
        const upadatedreview = await knex("review")
            .where({
                id: id
            })
            .update(request.body);
        response.json(upadatedreview);
    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            response.status(400).json({
                error: "limit must be integers."
            });
            return;
        }
        await knex("review")
            .where({
                id: id
            })
            .del();

        response.status(201).send("Review successfully deleted");

    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

module.exports = router;