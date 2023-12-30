const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// .env file to file the informaiton
require('dotenv').config();

const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
 },
    console.log(`Connected to the employee_db database.`)

 );

 db.connect(function(err) {
    if (err) throw err;
    console.log("*************************************");
    console.log("          EMPLOYEE TRACKER           ");
    console.log("*************************************");

  });


// starting questions
function startQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]).then(function (answer) {
        switch (answer.intro) {
            case 'View All Employees':
                viewEmployees();
                break;

            case 'View All Departments':
                viewDepartments();
                break;

            case 'View All Roles':
                viewRoles();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Quit':
                console.log('Goodbye!');
                db.end();
                break;
        }
    })
};
