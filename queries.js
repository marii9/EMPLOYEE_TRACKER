const mysql = require('mysql2/promise');
require('console.table');
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_tracker',
  connectionLimit: 10,
  queueLimit: 0
});

async function getAllManagers() {
    const [rows, fields] = await pool.execute(`
      SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, COUNT(employee.manager_id) AS num_of_reports
      FROM employee
      JOIN employee AS manager ON employee.manager_id = manager.id
      GROUP BY manager_name
    `);
    return rows;
  }




async function getAllDepartments() {
  const [rows, fields] = await pool.execute('SELECT * FROM department');
  return rows;
}
async function getAllDepartmentNames() {
    const [rows, fields] = await pool.execute('SELECT name FROM department');
    return rows.map(row => row.name);
  }

async function getAllRoles() {
  const [rows, fields] = await pool.execute(`
    SELECT role.*, department.name AS department_name
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return rows;
}

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

async function addDepartment(name) {
  const [rows, fields] = await pool.execute('INSERT INTO department (name) VALUES (?)', [name]);
  return { id: rows.insertId, name };
}

async function addRole(title, salary, departmentId) {
  const [rows, fields] = await pool.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  return { id: rows.insertId, title, salary, department_id: departmentId };
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  const [rows, fields] = await pool.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  return { id: rows.insertId, first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId };
}

async function updateEmployeeRole(employeeName, newRoleTitle) {
  const [employee] = await pool.execute('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?', [employeeName]);
  const [newRole] = await pool.execute('SELECT id FROM role WHERE title = ?', [newRoleTitle]);
  const [result] = await pool.execute('UPDATE employee SET role_id = ? WHERE id = ?', [newRole.id, employee.id]);
  return result.affectedRows > 0;
}
async function getAllRoleTitles() {
    const [rows, fields] = await pool.execute('SELECT title FROM role');
    return rows.map(row => row.title);
  }

module.exports = { getAllDepartments, getAllRoles, getAllEmployees,getAllDepartmentNames,  addDepartment, getAllRoleTitles, getAllManagers,  addRole, addEmployee, updateEmployeeRole };