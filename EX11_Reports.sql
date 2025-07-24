SELECT 
    v.visit_id,
    p.name AS patient_name,
    d.name AS doctor_name,
    v.visit_date,
    v.diagnosis,
    v.status
FROM Visits v
JOIN Patients p ON v.patient_id = p.patient_id
JOIN Doctors d ON v.doctor_id = d.doctor_id;

SELECT 
    b.bill_id,
    p.name AS patient_name,
    b.total_amount,
    b.payment_status
FROM
    Bills b
        JOIN
    Visits v ON b.visit_id = v.visit_id
        JOIN
    Patients p ON v.patient_id = p.patient_id
WHERE
    b.payment_status = 'Unpaid';

SELECT 
    SUM(total_amount) AS total_income
FROM Bills
WHERE payment_status = 'Paid';

