const userModel = require('../repository/UserRepo.js');
const jwt = require('../config/JWT.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
exports.registerUser = async (name, dob, phone, email, password, suburb) => {
  try {
    const existingUser = await userModel.findByEmailUser(email);
    if (existingUser > 0) {
      return { message: "Email already registered" };
    }
    const existingUserAdmin = await userModel.findByEmailAdmin(email);
    if (existingUserAdmin > 0) {
      return { message: "Email already registered" };
    }
    await userModel.create(name, dob, phone, email, password, suburb);

    return { message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (email, password) => {
  try {
    const existingUser = await userModel.findByEmailUser(email);
    if (existingUser > 0) {
      const passwordMatch = await userModel.checkPasswordMatchUser(
        email,
        password
      );
      if (passwordMatch) {
        const user = await userModel.getUser(email);
        const accessToken = jwt.createToken(user.name, "user", null, user.id);
        return {
          message: "User logged in successfully",
          accessToken: accessToken,
        };
      } else {
        return { message: "User entered wrong password" };
      }
    } else {
      const existingUserAdmin = await userModel.findByEmailAdmin(email);
      if (existingUserAdmin > 0) {
        const passwordMatch = await userModel.checkPasswordMatchAdmin(
          email,
          password
        );
        if (passwordMatch) {
          const admin = await userModel.getAdmin(email);
          const accessToken = jwt.createToken(
            admin.name,
            "admin",
            admin.type,
            admin.id
          );
          return {
            message: "User logged in successfully",
            accessToken: accessToken,
          };
        } else {
          return { message: "User entered wrong password" };
        }
      } else {
        return { message: "No any registered user for this email" };
      }
    }
  } catch (error) {
    throw error;
  }
};

exports.createAdmin = async (name, dob, phone, email, password, adminType) => {
  try {
    const existingUser = await userModel.findByEmailUser(email);
    if (existingUser > 0) {
      return { message: "Email already registered" };
    }
    const existingUserAdmin = await userModel.findByEmailAdmin(email);
    if (existingUserAdmin > 0) {
      return { message: "Email already registered" };
    }
    await userModel.createAdminUser(
      name,
      dob,
      phone,
      email,
      password,
      adminType
    );
    return { message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
};

exports.editUser = async (name, dob, phone, suburb, email) => {
  try {
    const existingUser = await userModel.findByEmailUser(email);
    if (existingUser > 0) {
      await userModel.updateUser(name, dob, phone, email, suburb);
      return { message: "Updated Successfully" };
    } else {
      return { message: "User not found!" };
    }
  } catch (error) {
    throw error;
  }
};

exports.editAdmin = async (name, dob, phone, email) => {
  try {
    const existingUser = await userModel.findByEmailAdmin(email);
    if (existingUser > 0) {
      await userModel.updateAdmin(name, dob, phone, email);
      return { message: "Updated Successfully" };
    } else {
      return { message: "User not found!" };
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (email) => {
  try {
    const existingUser = await userModel.findByEmailUser(email);
    if (existingUser > 0) {
      await userModel.deleteUser(email);
      return { message: "Delete Successfully" };
    } else {
      const existingAdmin = await userModel.findByEmailAdmin(email);
      if (existingAdmin > 0) {
        const admin = await userModel.getAdmin(email);
        if (admin.type === "super") {
          return { message: "Delete not allowed super admin account" };
        } else {
          await userModel.deleteAdmin(email);
          return { message: "Delete Successfully" };
        }
      } else {
        return { message: "User not found!" };
      }
    }
  } catch (error) {
    throw error;
  }
}; 