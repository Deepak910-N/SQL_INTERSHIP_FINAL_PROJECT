DELIMITER $$

CREATE PROCEDURE CalculateBill (
    IN p_visit_id INT,
    IN p_consultation_fee DECIMAL(10,2),
    IN p_treatment_cost DECIMAL(10,2)
)
BEGIN
    DECLARE total DECIMAL(10,2);
    SET total = p_consultation_fee + p_treatment_cost;

    INSERT INTO Bills (visit_id, consultation_fee, treatment_cost, total_amount, payment_status)
    VALUES (p_visit_id, p_consultation_fee, p_treatment_cost, total, 'Unpaid');
END $$

DELIMITER ;
