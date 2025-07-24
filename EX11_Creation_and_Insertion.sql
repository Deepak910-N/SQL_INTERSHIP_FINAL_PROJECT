CREATE DATABASE HospitalDB;
USE HospitalDB;

CREATE TABLE Patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    contact VARCHAR(15),
    address TEXT
);

CREATE TABLE Doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    specialization VARCHAR(100),
    contact VARCHAR(15)
);

CREATE TABLE Visits (
    visit_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    visit_date DATE,
    diagnosis TEXT,
    status ENUM('Admitted', 'Discharged'),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
);

CREATE TABLE Bills (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_id INT,
    consultation_fee DECIMAL(10, 2),
    treatment_cost DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    payment_status ENUM('Paid', 'Unpaid'),
    FOREIGN KEY (visit_id) REFERENCES Visits(visit_id)
);

INSERT INTO Patients (name, age, gender, contact, address)
VALUES 
('Alice', 30, 'Female', '9876543210', 'Chennai'),
('Bob', 40, 'Male', '9123456789', 'Coimbatore');

INSERT INTO Doctors (name, specialization, contact)
VALUES 
('Dr. Ravi Kumar', 'Cardiologist', '9001122334'),
('Dr. Priya Sharma', 'Dermatologist', '9445566778');

INSERT INTO Visits (patient_id, doctor_id, visit_date, diagnosis, status)
VALUES 
(1, 1, '2025-07-10', 'Hypertension', 'Admitted'),
(2, 2, '2025-07-11', 'Acne', 'Discharged');

INSERT INTO Bills (visit_id, consultation_fee, treatment_cost, total_amount, payment_status)
VALUES 
(1, 500.00, 2000.00, 2500.00, 'Unpaid'),
(2, 300.00, 1200.00, 1500.00, 'Paid');
