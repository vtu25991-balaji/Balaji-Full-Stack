-- Task 5: Transaction-Based Payment Simulation
-- Simulate an online payment process using COMMIT/ROLLBACK
-- Real-Time Usage: Banking and digital payment applications.

CREATE TABLE Accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(100),
    balance DECIMAL(15, 2)
);

INSERT INTO Accounts (account_name, balance) VALUES
('User Account', 500.00),
('Merchant Account', 10000.00);

-- Note: Delimiters are required in MySQL to define Stored Procedures
DELIMITER //

CREATE PROCEDURE ProcessPayment(IN payment_amount DECIMAL(10,2))
BEGIN
    DECLARE current_balance DECIMAL(15, 2);
    
    -- Start Transaction
    START TRANSACTION;
    
    -- Check user balance and lock the row
    SELECT balance INTO current_balance FROM Accounts WHERE id = 1 FOR UPDATE;
    
    IF current_balance >= payment_amount THEN
        -- Deduct from user account
        UPDATE Accounts SET balance = balance - payment_amount WHERE id = 1;
        -- Add to merchant account
        UPDATE Accounts SET balance = balance + payment_amount WHERE id = 2;
        
        -- Commit Transaction on success
        COMMIT;
        SELECT 'Payment Successful' AS TransactionStatus, payment_amount AS AmountDeducted;
    ELSE
        -- Rollback on failure (insufficient funds)
        ROLLBACK;
        SELECT 'Payment Failed: Insufficient Funds' AS TransactionStatus, current_balance AS CurrentBalance;
    END IF;
    
END //
DELIMITER ;

-- Test 1: Valid payment (Will Deduct 200)
CALL ProcessPayment(200.00);

-- Display balances after successful test
SELECT * FROM Accounts;

-- Test 2: Invalid payment (Will fail and trigger rollback due to insufficient funds)
CALL ProcessPayment(1000.00);

-- Display balances after failed test
SELECT * FROM Accounts;
