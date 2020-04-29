
INSERT INTO department (name)
VALUES ("Transportation");

INSERT INTO department (name)
VALUES ("childrens");

INSERT INTO department (name)
VALUES ("commnunity outreach");

INSERT INTO roles (title, department_id)
VALUES ("bus driver", 1);

INSERT INTO roles (title, department_id)
VALUES ("tutor", 2);

INSERT INTO volunteer (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "James", 1, 1);

INSERT INTO volunteer (first_name, last_name, role_id, manager_id)
VALUES ("Tommy", "James", 2, 2);

INSERT INTO volunteer (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 3, 3);


SELECT first_name, last_name FROM volunteer;
