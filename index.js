
const inquirer = require('inquirer');
const queries = require('./queries');

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_tracker'
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to database!');

  connection.release();
});

async function init() {
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

  switch (answer.action) {
    case 'View all departments':
      const departments = await queries.getAllDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      const roles = await queries.getAllRoles();
      console.table(roles);
      break;

    case 'View all employees':
      const employees = await queries.getAllEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      const newDept = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
      });
      await queries.addDepartment(newDept.name);
      console.log('New department added successfully!');
      break;

    case 'Add a role':
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
      console.log('New role added successfully!');
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
          choices: await queries.getAllManagers()
        }
      ]);
      await queries.addEmployee(newEmp.first_name, newEmp.last_name, newEmp.role, newEmp.manager);
      console.log('New employee added successfully!');
      break;

    case 'Update an employee role':
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
      break;

    default:
      console.log('Invalid action!');
      break;
    }
    }
    
    init();