var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "VOLUNTEER_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start()
  });


function createVol(){
 var questions =[
     {
         type:"input",
         Title:"",
         message:"What is your title?"
     }
     {
        type:"input",
        Seats:"",
        message:"How many seats?"
     }
     {
        type:"input",
        Address:"",
        message:"What is your Address?"
     }
     {
         type:"input",
         Date:"",
         message:"What Date?"
     }
     {
         type:"input",
         Date:"",
         message:"What Time?"
     }
     {
        type:"input",
        Date:"",
        message:"What Duration?"
     }
     {
         type:"input",
         Date:"",
         message:"Effort level?"
     }
 ]
 inquirer.prompt(questions).then(function(userResponse){
     console.log(userResponse)
     connection.query("INSERT INTO VOLUNTEER(VOL_Name,) VALUES (?,?,?)",[userResponse.superName,],
        function (err, res) {
            if(err) throw err
            console.log(res)
            start()
        }
     )
 })
}

function start() {
     connection.query('SELECT * FROM VOLUNTEER_db.VOL', function(err, vol){
        if(err) throw err;
        console.table(vol)
        createvol()
    });