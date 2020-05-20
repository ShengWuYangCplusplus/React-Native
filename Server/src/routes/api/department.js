var express = require('express')
var router = express.Router()
const { list } = require('../../store/department.js')

router.get('/', getData);

function getData(req, res, next) {
  list().then(
    result => {
      res.json({ code: 0, data: result, des: 'success' })
    }
  ).catch(
    err => next(err)
  )
}

module.exports = router;