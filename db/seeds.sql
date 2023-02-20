INSERT INTO department ( name) VALUES ('Sales');
INSERT INTO department ( name) VALUES ( 'Engineering');
INSERT INTO department ( name) VALUES ( 'Finance');
INSERT INTO department ( name) VALUES ('Marketing');

-- Add some roles
INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Sales Manager', 60000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Accountant', 80000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Senior Software Engineer', 75000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (4, 'Marketer', 95000, 4);
-- INSERT INTO role (id, title, salary, department_id) VALUES (5, 'Accountant', 65000, 3);
-- INSERT INTO role (id, title, salary, department_id) VALUES (6, 'Finance Manager', 90000, 3);
-- INSERT INTO role (id, title, salary, department_id) VALUES (7, 'Marketing Manager', 45000, 4);
-- INSERT INTO role (id, title, salary, department_id) VALUES (8, 'Marketing Coordinator', 75000, 4);

-- -- Add some employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'Marky', 'Mark', 1, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Ashley', 'Boyd', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Bob', 'Smith', 3, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Alice', 'Johnson', 4, 1);
-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'Charlie', 'Brown', 5, 1);
-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, 'David', 'Jones', 6, null);
-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, 'Eve', 'Lee', 7, null);
-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, 'Frank', 'Davis', 8, 7);
