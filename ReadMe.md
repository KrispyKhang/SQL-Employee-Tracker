## 12 SQL Employee Tracker

* [Github Repository](https://github.com/KrispyKhang/SQL-Employee-Tracker)

## Task
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```


## Summary
* NodeJS, Inquirer, and MySQL, MySQL2 were packages installed
* a Schema.sql to showcase the model of the database was created
* a Seeds.sql to input data.
* Ran workbench to exucute both Schema and Seeds for us to run our inquirer
* Created a Server.js and created a database connection.
* Inquirer installed and connected to the server. Then we make a series of questions for users to interact with the promopt when we run our node.
* Before running "npm start" - make sure you run your Seeds and Schema sql files on workbench or terminal for the inquirer prompt to initiate. 
* PLEASE SEE BELOW FOR EXAMPLE WHEN RUNNING THE INQUIRER USING "NPM START"


![](./Image%20Assets/Feb-16-2024%2015-04-06.gif)

## Ta-Da
* We've created a database that is easy to use for non-developers to manage Company empployee database!