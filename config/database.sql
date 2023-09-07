CREATE TABLE patients(
patientId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
firstName VARCHAR(100),
lastName VARCHAR(100),
nic VARCHAR(15) NOT NULL UNIQUE,
gender VARCHAR(10),
password INT NOT NULL ,
age INT NOT NULL ,
dob DATE,
per_address VARCHAR(255), 
phone_no INT NOT NULL,
occupation VARCHAR(100),
pro_pic VARCHAR(255), 
patientDesc VARCHAR(145),

-- Height , Weight , blood group , Heart rate

heartRate VARCHAR(255),
bloodGroup VARCHAR(100),
height DECIMAL(8,2),
weight DECIMAL(8,2)
);

CREATE TABLE doctors (
doctorId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
firstName VARCHAR(100),
lastName VARCHAR(100),
gender VARCHAR(10),
password VARCHAR(100) NOT NULL,
dob DATE,
phone_no INT NOT NULL,
pro_pic VARCHAR(255),
specialization VARCHAR(255),
drDesc VARCHAR(145)
);


CREATE TABLE reports (
reportId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
patientId INT NOT NULL,
updatedDateTime DATETIME,
heartRate VARCHAR(255),
bloodGroup VARCHAR(100),
height DECIMAL(8,2),
weight DECIMAL(8,2),
disease VARCHAR(255),
reportImage VARCHAR(255),
treatments VARCHAR(255),
reportDocuments VARCHAR(255),

FOREIGN KEY (patientId) REFERENCES patients(patientId)
);


