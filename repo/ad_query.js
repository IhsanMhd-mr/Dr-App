const pool = require('../server.js');
const bcrypt = require('bcrypt');

exports.createDoctor = async (doctor) => {
  try {
    const encrypted_password = await bcrypt.hash(doctor.password, 10);
    const insertQuery = `INSERT INTO doctors (email, phone_no, password, firstName) VALUES (?,?,?,?)`;
    await pool.query(insertQuery, [doctor.email, doctor.phone_no, encrypted_password, doctor.firstName]);
  } catch (error) {
    throw error;
  }
};

exports.findByEmail = async (email) => {
  try {
    const selectQuery = `SELECT email, phone_no, password, firstName FROM doctors WHERE email = ?`;
    const [rows] = await pool.query(selectQuery, [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

exports.getAllDoctors = async () => {
  try {
    const selectQuery = `SELECT email, phone_no, password, firstName FROM doctors`;
    const [rows] = await pool.query(selectQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};
