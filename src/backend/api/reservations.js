const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get('/', async (request, response) => {
    try {
        const reservations = await knex('reservation')
        response.send(reservations);
    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

router.post('/', async (request, response) => {
    try {
        let newReservation = request.body;
        if(newReservation.contact_name == null || newReservation.contact_name.trim().length == 0){
            response.status(400).send({
                error: "Contact name is mandatory."
            });
            return;
        }
        else if(newReservation.contact_phonenumber == null || newReservation.contact_phonenumber.trim().length == 0){
            response.status(400).send({
                error: "Contact phone is mandatory."
            });
            return;
        }
        else if(!phoneNumberPattern.test(newReservation.contact_phonenumber)){
            response.status(400).send({
                error: "Contact phone number is invalid."
            });
            return;
        }
        else if(newReservation.contact_email == null || newReservation.contact_email.trim().length == 0){
            response.status(400).send({
                error: "Contact email is mandatory."
            });
            return;
        }
        else if(!emailPattern.test(newReservation.contact_email)){
            response.status(400).send({
                error: "Contact email is invalid."
            });
            return;
        }

        newReservation.created_date = new Date();
        await knex("reservation")
            .insert(newReservation);
        response.status(201).json("Reservation has been added");
    } catch (error) {
        console.log(error);
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
        const reservationsWithId = await knex("reservation")
            .where({
                id: id
            });
        response.json(reservationsWithId);
    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});

//Updates the reservation by id
router.put('/:id', async (request, response) => {
    try {

        const id = parseInt(request.params.id);

        console.log(id, request.body);

        if (isNaN(id)) {
            response.status(400).json({
                error: "limit must be integers."
            });
            return;
        }
        const upadatedreservation = await knex("reservation")
            .where({
                id: id
            })
            .update(request.body);
        response.json(upadatedreservation);
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
        await knex("reservation")
            .where({
                id: id
            })
            .del();

        response.status(201).send("Reservation successfully deleted");

    } catch (error) {
        response.status(500).send({
            error: "Internal Server Error."
        });
    }
});



module.exports = router;