-- Task 6: Automated Logging using Triggers & Views
-- A trigger that logs every INSERT or UPDATE, and a view that shows daily activity reports
-- Real-Time Usage: Audit logging in enterprise databases.

-- Target Table
CREATE TABLE Employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2)
);

-- Audit Logging Table
CREATE TABLE AuditLog (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(50),
    action VARCHAR(50),
    action_time DATETIME,
    details VARCHAR(255)
);

-- Trigger: Log INSERT actions
DELIMITER //
CREATE TRIGGER AfterEmployeeInsert
AFTER INSERT ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (table_name, action, action_time, details)
    VALUES ('Employees', 'INSERT', NOW(), CONCAT('Inserted Employee ID: ', NEW.id, ', Name: ', NEW.name));
END;
//
DELIMITER ;

-- Trigger: Log UPDATE actions
DELIMITER //
CREATE TRIGGER AfterEmployeeUpdate
AFTER UPDATE ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (table_name, action, action_time, details)
    VALUES ('Employees', 'UPDATE', NOW(), CONCAT('Updated Employee ID: ', NEW.id, ' Salary from ', OLD.salary, ' to ', NEW.salary));
END;
//
DELIMITER ;

-- Test the triggers by making changes
INSERT INTO Employees (name, department, salary) VALUES ('Alice Martin', 'Engineering', 75000.00);
INSERT INTO Employees (name, department, salary) VALUES ('Bob Jones', 'Marketing', 50000.00);
UPDATE Employees SET salary = 80000.00 WHERE name = 'Alice Martin';

-- Define a VIEW for Daily Activity Reports (aggregate log entries by day)
CREATE VIEW DailyActivityReport AS
SELECT 
    DATE(action_time) AS ActivityDate,
    action AS ActionType,
    COUNT(*) AS TotalActions
FROM AuditLog
GROUP BY DATE(action_time), action;

-- Query the view to see daily analytics
SELECT * FROM DailyActivityReport;
