var db = require("../models");


// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {


    //Inputs: None
    //Outputs: list of all active events starting on today's date or later
    app.get("/api/events", function(req, res) {

        db.Events.findAll({
            include: [db.Post]
        }).then(function(dbEvent) {
            res.json(dbEvent);
        });
    });



    //Input: a single event ID
    //Output: data for the event
    app.get("/api/event", function(req, res) {

    });


    //Inputs: New Event Form
    //Output:TBD
    app.post("/api/event", function(req, res) {

    });


    //Input Event ID
    //Output: Registrations for the event
    app.get("/api/registrations", function(req, res) {

    });


    app.post("/api/registration", function(req, res) {

    });
}