DELIMITER $$

CREATE TRIGGER update_bill_on_discharge
AFTER UPDATE ON Visits
FOR EACH ROW
BEGIN
    IF NEW.status = 'Discharged' AND OLD.status != 'Discharged' THEN
        UPDATE Bills
        SET payment_status = 'Paid'
        WHERE visit_id = NEW.visit_id;
    END IF;
END $$

DELIMITER ;
