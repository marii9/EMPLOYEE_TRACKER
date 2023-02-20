
const { printTable } = require('console-table-printer');
const inquirer = require('inquirer');
const queries = require('./queries');

// Define an async function called "init"
async function init() {
  // Ask the user what they would like to do using the inquirer package
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ]
  });

  // Use a switch statement to handle the user's choice
  switch (answer.action) {
    case 'View all departments':
      // Call the "getAllDepartments" function from "queries" module and print the results using "printTable" package
      const departments = await queries.getAllDepartments();
      printTable(departments);
      // Call the "init" function to restart the process
      init();
      break;

    case 'View all roles':
      // Call the "getAllRoles" function from "queries" module and print the results using "printTable" package
      const roles = await queries.getAllRoles();
      printTable(roles);
      // Call the "init" function to restart the process
      init();
      break;

    case 'View all employees':
      // Call the "getAllEmployees" function from "queries" module and print the results using "printTable" package
      const employees = await queries.getAllEmployees();
      printTable(employees);
      // Call the "init" function to restart the process
      init();
      break;

    case 'Add a department':
      // Ask the user for the name of the new department using inquirer and call the "addDepartment" function from "queries" module to add it to the database
      const newDept = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
      });
      await queries.addDepartment(newDept.name);
      // Notify the user that the department has been added and call the "init" function to restart the process
      console.log('New department added successfully!');
      init();
      break;

    case 'Add a role':
      // Ask the user for the title, salary, and department of the new role using inquirer and call the "addRole" function from "queries" module to add it to the database
      const newRole = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the new role:'
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary of the new role:'
        },
        {
          type: 'list',
          name: 'department',
          message: 'Select the department for the new role:',
          choices: await queries.getAllDepartmentsNames()
        }
      ]);
      await queries.addRole(newRole.title, newRole.salary, newRole.department);
      // Notify the user that the role has been added and call the "init" function to restart the process
      console.log('New role added successfully!');
      init();
      break;


    case 'Add an employee':
      const newEmp = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:"
        },
        {
          type: 'list',
          name: 'role',
          message: "Select the employee's role:",
          choices: await queries.getAllRolesTitles()
        },
        {
          type: 'list',
          name: 'manager',
          message: "Select the employee's manager:",
          choices: await queries.getAllEmployeesNames()
        }
      ]);
       // Add the new employee to the database
      await queries.addEmployee(newEmp.first_name, newEmp.last_name, newEmp.role, newEmp.manager);
      console.log('New employee added successfully!');
      init();
      break;

    case 'Update an employee role':
      // Prompt user to select an employee and a new role
      const employeesList = await queries.getAllEmployeesNames();
      const chosenEmp = await inquirer.prompt({
        type: 'list',
        name: 'name',
        message: 'Select the employee you want to update:',
        choices: employeesList
      });
      const chosenRole = await inquirer.prompt({
        type: 'list',
        name: 'role',
        message: 'Select the employee new role:',
        choices: await queries.getAllRolesTitles()
      });
      await queries.updateEmployeeRole(chosenEmp.name, chosenRole.role);
      console.log('Employee role updated successfully!');
      init();
      break;

    default:
      // If user enters an invalid action, display an error message and return to the main menu
      console.log('Invalid action!');
      init();
      break;
    }
    }
    // Call the init() function to display the main menu
    init();
