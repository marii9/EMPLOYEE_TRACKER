INSERT INTO department (id, name) VALUES (1, 'Sales');
INSERT INTO department (id, name) VALUES (2, 'Engineering');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Marketing');

-- Add some roles
INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Salesperson', 60000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Sales Manager', 80000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Software Engineer', 75000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (4, 'Senior Software Engineer', 95000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5, 'Accountant', 65000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (6, 'Finance Manager', 90000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (7, 'Marketing Coordinator', 45000, 4);
INSERT INTO role (id, title, salary, department_id) VALUES (8, 'Marketing Manager', 75000, 4);

-- Add some employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'Marky', 'Mark', 1, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Ashley', 'Boyd', 2, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Bob', 'Smith', 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Alice', 'Johnson', 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'Charlie', 'Brown', 5, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, 'David', 'Jones', 6, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, 'Eve', 'Lee', 7, 8);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, 'Frank', 'Davis', 8, 7);