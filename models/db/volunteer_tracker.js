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
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
            ],
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.toDo === "Add departments, roles, employees") {
                runAddFunction();
            } else if (answer.toDo === "View departments, roles, employees") {
                runViewFunction();
            } else if (answer.toDo === "Update employee roles") {
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
            choices: ["departments", "roles", "employees"],
        })
        .then(function (answer) {
            if (answer.toDo === "departments") {
                addDepartment();
            } else if (answer.toDo === "roles") {
                addRole();
            } else if (answer.toDo === "employees") {
                addEmployee();
            }
        });
}

function runViewFunction() {
    inquirer
        .prompt({
            message: "Which one would you like to view?",
            name: "toDo",
            type: "list",
            choices: ["departments", "roles", "employees"],
        })
        .then(function (answer) {
            if (answer.toDo === "departments") {
                viewDepartment();
            } else if (answer.toDo === "roles") {
                viewRole();
            } else if (answer.toDo === "employees") {
                viewEmployee();
            }
        });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function (error, data) {
        console.table(data)
        if (error) throw err;
        console.log(data);
        start();
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

function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, data) {
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
            choices: ["departments", "roles", "employees"],
        })
        .then(function (answer) {
            if (answer.toDo === "departments") {
                updateDepartment();
            } else if (answer.toDo === "roles") {
                updateRole();
            } else if (answer.toDo === "employees") {
                updateEmployee();
            }
        });
}

function updateRole() {
    inquirer
        .prompt([{
            message: "What is the role_id you wish to update?",
            name: "role_id",
        }, 
        {
            message: "what the new role title?",
            name: "newTitle",
        },
        {
            message: "What is the salary for the role?",
            name: "newSalary",
        },
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE roles SET ?, ? WHERE ? ", 
                [{
                    title: answer.newTitle,
                },
                {
                    salary: answer.newSalary,
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

function updateDepartment() {
    inquirer
        .prompt([{
                message: " What is the department id",
                name: "department_id",
            },

            {
                message: "Whats the new department name?",
                name: "departmentName",
            },
        ])
        .then(function (answer) {
            connection.query(
                "UPDATE department SET ? WHERE ?",
                [{
                        name: answer.name,
                    },
                    {
                        id: answer.department_id,
                    },
                ],

                function (err) {
                    if (err) throw err;

                    start();
                }
            );
        });
}

function updateEmployee() {
    inquirer
        .prompt([{
                message: " What is the employee id?",
                name: "id",
            },

            {
                message: "Whats the new department name?",
                name: "departmentName",
            },
        ])
        .then(function (answer) {
            connection.query(
                "SELECT * FROM employee WHERE ?",
                [{
                    id: answer.id,
                }, ],

                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    updateEmployeeInfo(answer.id);
                }
            );
        });
}

function updateEmployeeInfo(employeeId) {
    inquirer
        .prompt([{
                message: "What do you want to update for the employee?",
                name: "updateEmployeeInfo",
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
                "UPDATE employee SET ? WHERE ?",
                [{
                        [answer.updateEmployeeInfo]: answer.newValue,
                    },
                    {
                        id: employeeId,
                    },
                ],

                function (err) {
                    if (err) throw err;

                    start();
                }
            );
        });
}

function addDepartment() {
    inquirer
        .prompt({
            message: "What's the name of the department",
            name: "departmentName",
        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?", {
                    name: answer.departmentName,
                },
                function (err) {
                    if (err) throw err;

                    start();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([{
            message: "What's the employees id",
            name: "newEmployeeId",
        },
        {
            message: "What is the Employee first name?",
            name: "newEmployeeFirstName",
        },
        {
            message: "What is the Employee last name>?",
            name: "newEmployeeLastName",
        },
        {
            message: "What is the Employee role id?",
            name: "roleId",
        },
        {
            message: "what is the Employee manager id?",
            name:"mangerId"
        }
    ])  
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?", {
                    id: answer.newEmployeeId,
                    first_name: answer.newEmployeeFirstName,
                    last_name: answer.newEmployeeLastName,
                    role_id: answer.roleId,
                    manager_id : answer.mangerId,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    start();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([{
                message: "What's the role of the employee",
                name: "roleName",
            },
            {
                message: "What is the salary for the employee",
                name: "salary",
            },
            {
                message: "What is the department id?",
                name: "departmentId",
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?", {
                    title: answer.roleName,
                    salary: answer.salary,
                    department_id: answer.departmentId,
                },
                function (err) {
                    if (err) throw err;
                    start();
                }
            );
        });
}