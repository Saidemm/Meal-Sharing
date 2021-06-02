const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get('/', async (request, response) =>{
    try {
        const reservations = await knex('reservation')
        response.send(reservations);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});

router.post('/', async (request, response) => {
    try {
        let newReservation = request.body;
        newReservation.created_date = new Date(newReservation.created_date);
        await knex("reservation")
            .insert(newReservation);
        response.status(201).json("Reservation has been added");
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});

router.get('/:id', async(request, response) => {
    try{
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            response.status(400).json({ error: "limit must be integers." });
            return;
          }
        const reservationsWithId = await knex("reservation")
        .where({id : id});
        response.json(reservationsWithId);
    } catch(error) {
        response.status(500).send({ error: "Internal Server Error." });   
    }
});

//Updates the reservation by id
router.put('/:id', async(request, response) => {
    try{
        
        const id = parseInt(request.params.id);

        console.log(id, request.body);

        if (isNaN(id)) {
            response.status(400).json({ error: "limit must be integers." });
            return;
          }
        const upadatedreservation = await knex("reservation")
        .where({id : id})
        .update(request.body);
        response.json(upadatedreservation);
    } catch(error) {
        response.status(500).send({ error: "Internal Server Error." });   
    }
});


router.delete('/:id', async(request, response) => {
    try{
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            response.status(400).json({ error: "limit must be integers." });
            return;
          }
        await knex("reservation")
        .where({id : id})
        .del();
        
        response.status(201).send("Reservation successfully deleted");

    } catch(error) {
        response.status(500).send({ error: "Internal Server Error." });   
    }
});
  


module.exports = router;