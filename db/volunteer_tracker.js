const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "abc123",
    database: "volunteer",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            message: "What would you like to do?",
            name: "toDo",
            type: "list",
            choices: [
                "add roles, volunteers",
                "View roles, volunteers",
                "Update roles, volunteers",
            ],
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.toDo === "Add roles, volunteers") {
                runAddFunction();
            } else if (answer.toDo === "View roles, volunteers") {
                runViewFunction();
            } else if (answer.toDo === "Update roles, volunteers ") {
                updatesFunction();
            } else {
                connection.end();
            }
        });
}

function runAddFunction() {
    inquirer
        .prompt({
            message: "Which one would you like to add?",
            name: "toDo",
            type: "list",
            choices: ["roles", "volunteers"],
        })
        .then(function (answer) {
            if (answer.toDo === "roles") {
                addRole();
            } else if (answer.toDo === "volunteers") {
                addVolunteer();
            } 
        });
}

function runViewFunction() {
    inquirer
        .prompt({
            message: "Which one would you like to view?",
            name: "toDo",
            type: "list",
            choices: ["roles", "volunteers"],
        })
        .then(function (answer) {
            if (answer.toDo === "roles") {
                viewRole();
            } else if (answer.toDo === "volunteers") {
                viewVolunteer(); 
            } 
        });
}

function viewRole() {
    connection.query("SELECT * FROM roles", function (error, data) {
        console.table(data)
        if (error) throw err;
        console.log(data);
        start();
    });
}

function viewVolunteer() {
    connection.query("SELECT * FROM volunteer", function (err, data) {
        console.table(data)
        if (err) throw err;
        console.log(data);
        start();
    });
}

function updatesFunction() {
    inquirer
        .prompt({
            message: "Which one would you like to update?",
            name: "toDo",
            type: "list",
            choices: ["roles", "volunteers"],
        })
        .then(function (answer) {
            if (answer.toDo === "roles") {
                updateRole();
            } else if (answer.toDo === "volunteers") {
                updateVolunteer();
            }
        });
}

function updateRole() {
    inquirer
        .prompt([{
            message: "What is the role_id you wish to update?",
            name: "role_id",
            type: "list",
            choices: ["1", "2", "3", "4","5"]
        }, 
        {
            message: "what the new role title?",
            name: "newTitle",
            type: "list",
            choice: ["bus driver", "community outreach", "tutor", "mentor", "manager"]
        },
        {
            message: "What is the location id?",
            name: "locationId",
            type: "list",
            choices: ["101", "202", "303", "404", "505", "606", "707", "808"]

        },
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE roles SET ?, ? WHERE ? ", 
                [{
                    title: answer.newTitle,
                },
                {
                    location_Id: answer.locationId,
                },
                {
                    id: answer.role_id,
                },
            ],

                function (err) {
                    if (err) throw err;

                    start();
                }
            );
        });
}


function updateVolunteer() {
    inquirer
        .prompt([{
                message: " What is the volunteer id?",
                name: "id",
            },

            {
                message: "Whats the new role_id?",
                name: "newRoleId",
                type: "list",
                choices: ["1", "2", "3", "4","5"]
            },
        ])
        .then(function (answer) {
            connection.query(
                "SELECT * FROM volunteer WHERE ?",
                [{
                    id: answer.id,
                }, 
                {
                    roleId: answer.newRoleId,
                },
            ],

                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    updateVolunteerInfo(answer.id);
                }
            );
        });
}

function updateVolunteerInfo(volunteerId) {
    inquirer
        .prompt([{
                message: "What do you want to update for the volunteer?",
                name: "updateVolunteerInfo",
                type: "list",
                choices: ["first_name", "last_name", "role_id", "manager_id"],
            },
            {
                message: "What is the new value?",
                name: "newValue",
            },
        ])
        .then(function (answer) {
            connection.query(
                "UPDATE volunteer SET ? WHERE ?",
                [{
                        [answer.updateVolunteerInfo]: answer.newValue,
                    },
                    {
                        id: volunteerId,
                    },
                ],

                function (err) {
                    if (err) throw err;

                    start();
                }
            );
        });
}

function addVolunteer() {
    inquirer
        .prompt([{
            message: "What's the volunteers id",
            name: "newVolunteerId",
        },
        {
            message: "What is the volunteer first name?",
            name: "newVolunteerFirstName",
        },
        {
            message: "What is the volunteer last name>?",
            name: "newVolunteerLastName",
        },
        {
            message: "What is the volunteer role id?",
            name: "roleId",
            type: "list",
            choices: ["1", "2", "3", "4","5"]
        },
        {
            message: "what is the volunteer manager id?",
            name:"mangerId",
            type: "list",
            choices: ["1000", "2000", "3000", "4000", "5000"]
        }
    ])  
        .then(function (answer) {
            connection.query(
                "INSERT INTO volunteer SET ?", {
                    id: answer.newVolunteerId,
                    first_name: answer.newVolunteerFirstName,
                    last_name: answer.newVolunteerLastName,
                    role_id: answer.roleId,
                    manager_id : answer.mangerId,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your volunteer was created successfully!");
                    start();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([{
                message: "What's the title of the volunteer",
                name: "roleName",
                type: "list",
                choice: ["bus driver", "community outreach", "tutor", "mentor", "manager"]
            },
            {
                message: "What is the the location id",
                name: "newLocationId",
                type: "list",
                choices: ["101", "202", "303", "404", "505", "606", "707", "808"]
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?", {
                    title: answer.roleName,
                    locationId: answer.newLocationId,
                
                },
                function (err) {
                    if (err) throw err;
                    start();
                }
            );
        });
}