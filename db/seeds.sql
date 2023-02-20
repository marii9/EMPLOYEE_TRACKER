INSERT INTO department ( name) VALUES ( 'Sales');
INSERT INTO department ( name) VALUES ( 'Engineering');
INSERT INTO department ( name) VALUES ( 'Finance');
INSERT INTO department ( name) VALUES ('Marketing');

-- Add some roles
INSERT INTO role ( title, salary, department_id) VALUES ( 'Sales Manager', 60000, 1);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Sales Person', 80000, 1);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Senior Software Engineer', 75000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Software Engineer', 95000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Accountant', 65000, 3);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Finance Manager', 90000, 3);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Marketing Manager', 45000, 4);
INSERT INTO role ( title, salary, department_id) VALUES ( 'Marketing Coordinator', 75000, 4);

-- Add some employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'Marky', 'Mark', 1, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Ashley', 'Boyd', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Bob', 'Smith', 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Alice', 'Johnson', 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'Charlie', 'Brown', 5, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, 'David', 'Jones', 6, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, 'Eve', 'Lee', 7, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, 'Frank', 'Davis', 8, 7);
