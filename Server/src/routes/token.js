const express = require('express');
const router = express.Router();
var jwt = require("../util/jwt");
const { validate, list, createLog } = require('../store/users.js')
const toUtf = require('../util/base-to-utf8.js')

router.post('/', authenticate)
module.exports = router;

function authenticate(req, res, next) {
  var reqUser = toUtf(req)
  validate(reqUser).then(
    user => {
      if (user && user.length === 1) {
        const token = jwt.sign({
          name: user[0].name,
          identity: user[0].id,
          roleId: user[0].roleId
        });
        const obj = {
          code: 0,
          des: "success",
          data: user[0],
          token
        }
        createLog(user[0]).then(
          data => {
            res.json(obj)
          }
        ).catch(err => {
          next(err)
        })
      }
      else {
        res.status(200).json({
          code: 1,
          des: "Username or password is incorrect"
        })
      }
    }
  ).catch(err => next(err))
}