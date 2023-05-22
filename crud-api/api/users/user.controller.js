const {
  create,
  UserEmail,
  UserId,
  getUsers,
  updateUser,
  deleteUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const messages = require("./massage");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    UserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          message: require('./massage').invalidEmailOrPassword
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        // Generating a JWT with the results object as the payload
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.status(200).json({
          success: 1,
          message: require('./massage').loginSuccess,
          token: jsontoken
        });
      } else {
        return res.status(401).json({
          success: 0,
          message: require('./massage').invalidEmailOrPassword
        });
      }
    });
  },
  UserId: (req, res) => {
    const id = req.params.id;
    UserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: require('./massage').recordNotFound
        });
      }
      results.password = undefined;
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      return res.status(200).json({
        success: 1,
        message: require('./massage').updatedSuccessfully
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.body.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: require('./massage').databaseConnectionError
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: require('./massage').recordNotFound
        });
      }
      return res.status(200).json({
        success: 1,
        message: require('./massage').userDeletedSuccessfully
      });
    });
  }
};
