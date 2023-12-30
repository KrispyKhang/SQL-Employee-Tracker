const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// .env file to file the informaiton
require('dotenv').config();

const mysql = require('mysql2');
const { response } = require('express');

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
    startQuestions();
  });


// starting questions prompt
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


// Viewing Selections

function viewDepartments() {
    const sql = `SELECT department.id, department.name AS department FROM department`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        startQuestions();
    });
};


function viewRoles() {
    const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        startQuestions();
    });
};

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        startQuestions();
    });
};

// Adding Selections

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then(function (answer) {
        const sql = `INSERT INTO department(name) VALUES (?)`;
        // using parameterized queries with an array for passing the user input to the database query.
        db.query(sql, [answer.department], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("Added " + answer.department + " to the database")
            startQuestions();
        });
    });
};

function addRole() {
    const sql2 = `SELECT * FROM department`;
    db.query(sql2, (error, response) => {
        departmentList = response.map(departments => ({
            name: departments.name,
            value: departments.id
        }));
            
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which Department does the role belong to?',
                choices: departmentList
            }
        ]).then((answers) => {
            const insertQuery = `INSERT INTO role SET ?`;
            const roleData = {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department
            };
        
            db.query(insertQuery, roleData, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added " + answers.title + " to the database");
                startingQuestion();
            });
        });
    });
};


function addEmployee() {
    const sql2 = `SELECT * FROM employee`;
    db.query(sql2, (error, response) => {
        employeeList = response.map(employees => ({
            name: employees.first_name.concat(" ", employees.last_name),
            value: employees.id
        }));

    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (error, response) => {
        roleList = response.map(role => ({
            name: role.title,
            value: role.id
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: roleList
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee?',
                choices: employeeList
            }
        ]).then((answers) => {
            const insertQuery = `INSERT INTO employee SET ?`;
            const employeeData = {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager
            };
        
            db.query(insertQuery, employeeData, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added " + answers.firstName + " " + answers.lastName + " to the database");
                startingQuestion();
            });
        });
    });
});
}