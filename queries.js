const mysql = require('mysql2/promise');
const {printTable} = require('console-table-printer');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost', // Database server address
  port: 3306, // Database server port
  user: 'root', // Database user
  password: 'password', // Database user password
  database: 'employee_tracker', // Database name
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Maximum number of queued connection requests
});

// Define function to get all managers and their number of reports
async function getAllManagers() {
  const [rows, fields] = await pool.execute(`
    SELECT COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), NULL) AS manager_name, 
           COUNT(employee.manager_id) AS num_of_reports
    FROM employee
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    GROUP BY manager_name
  `);
  return rows;
}

// Define function to get all departments
async function getAllDepartments() {
  const [rows, fields] = await pool.execute('SELECT * FROM department');
  return rows;
}

// Define function to get all department names and ids
async function getAllDepartmentsNames() {
    const [rows, fields] = await pool.execute('SELECT id, name FROM department');
    return rows.map(row => ({name:row.name, value:row.id}));
}

// Define function to get all roles and their department names
async function getAllRoles() {
  const [rows, fields] = await pool.execute(`
    SELECT role.*, department.name AS department_name
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return rows;
}

// Define function to get all employees with their roles, departments, and managers
async function getAllEmployees() {
  const [rows, fields] = await pool.execute(`
    SELECT employee.*, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, role.title, role.salary, department.name AS department_name
    FROM employee
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  `);
  return rows;
}

// Define function to add a department to the database
async function addDepartment(name) {
  const [rows, fields] = await pool.execute('INSERT INTO department (name) VALUES (?)', [name]);
  return { id: rows.insertId, name };
}

// Define function to add a role to the database
async function addRole(title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [title, salary, parseInt(department_id)];
    const [result] = await  pool.execute(sql, params);
    return result.insertId;
  }

// Define function to add an employee to the database
async function addEmployee(firstName, lastName, roleId, managerId) {
    roleId = parseInt(roleId)
    const [rows, fields] = await pool.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId || null]);
  return { id: rows.insertId, first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId };
}

async function getAllEmployeesNames() {
  const [rows, fields] = await pool.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
  return rows.map(row => ({name:row.name, value:row.id}));
}

async function updateEmployeeRole(employeeName, newRoleTitle) {
  const [result] = await pool.execute('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleTitle, employeeName]);
  return result.affectedRows > 0;
}
async function getAllRolesTitles() {
    const [rows, fields] = await pool.execute('SELECT id, title FROM role');
    return rows.map(row => ({name:row.title, value:row.id}));
  }

module.exports = { getAllDepartments, getAllRoles, getAllEmployees, getAllEmployeesNames, getAllDepartmentsNames,  addDepartment, getAllRolesTitles, getAllManagers,  addRole, addEmployee, updateEmployeeRole };
