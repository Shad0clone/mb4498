CREATE DATABASE IF NOT EXISTS bookcircle;
USE bookcircle;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    friend VARCHAR(255),
    dueDate VARCHAR(50)
);
