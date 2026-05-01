-- Task 4: Order Management using Joins
-- Concepts Used: Joins, Subqueries, ORDER BY
-- Real-Time Usage: E-commerce and retail systems.

-- Create tables for Customers, Orders, Products
CREATE TABLE Customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    order_date DATE,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Insert dummy data
INSERT INTO Customers (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

INSERT INTO Products (name, price) VALUES
('Laptop', 1200.00),
('Smartphone', 800.00),
('Headphones', 150.00);

INSERT INTO Orders (customer_id, product_id, order_date, quantity) VALUES
(1, 1, '2023-01-10', 1),
(1, 3, '2023-01-15', 2),
(2, 2, '2023-02-20', 1),
(3, 1, '2023-03-05', 2);

-- Join query to display customer order history
SELECT 
    c.name AS CustomerName,
    p.name AS ProductName,
    o.quantity,
    o.order_date,
    (o.quantity * p.price) AS TotalValue
FROM Orders o
JOIN Customers c ON o.customer_id = c.id
JOIN Products p ON o.product_id = p.id
ORDER BY o.order_date DESC;

-- Subquery to find highest value order
SELECT 
    c.name, o.id AS OrderID, (o.quantity * p.price) AS OrderValue
FROM Orders o
JOIN Customers c ON o.customer_id = c.id
JOIN Products p ON o.product_id = p.id
WHERE (o.quantity * p.price) = (
    SELECT MAX(o2.quantity * p2.price)
    FROM Orders o2
    JOIN Products p2 ON o2.product_id = p2.id
);

-- Subquery to find most active customer
SELECT 
    c.name, COUNT(o.id) as TotalOrders
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY TotalOrders DESC
LIMIT 1;
