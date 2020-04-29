
DROP DATABASE IF EXISTS Volunteer;

CREATE DATABASE volunteer;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    location_id INT (10) NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location(id),
    PRIMARY KEY(id)
    );

    CREATE TABLE volunteer (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INT (10) NOT NULL,
    manager_id INT(20) NULL,
    KEY (manager_id) REFERENCES volunteer(id),
    PRIMARY KEY(id)
    );

