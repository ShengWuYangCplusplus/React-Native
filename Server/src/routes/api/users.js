var express = require('express')
var router = express.Router()
const { validate, list, detailUser, addUser, deleteUser, updateUser } = require('../../store/users.js')

router.get('/', getUsers);
router.get('/detail', getDetail)
router.post('/', addOne)
router.delete('/', deleteOne)
router.put('/', updateOne)

function getUsers(req, res, next) {
  list(req).then(
    users => {
      res.json({ code: 0, data: users, des: 'success' })
    }
  ).catch(
    err => next(err)
  )
}


function getDetail(req, res, next) {
  detailUser(req.query.userid).then(
    result => {
      res.json({ code: 0, data: result, des: 'success' })
    }
  ).catch(
    err => next(err)
  )
}

function addOne(req, res, next) {
  addUser(req).then(
    result => {
      if (result === 2) {
        res.json({
          code: 0, des: 'success'
        })
      }
    }
  ).catch(
    err => next(err)
  )
}
function deleteOne(req, res, next) {
  deleteUser(req.query.userId).then(
    result => {
      if (result === 2) {
        res.json({
          code: 0, des: 'success'
        })
      }
    }
  ).catch(
    err => next(err)
  )
}
function updateOne(req, res, next) {
  updateUser(req).then(
    result => {
      if (result === 2) {
        res.json({
          code: 0, des: 'success'
        })
      }
    }
  ).catch(
    err => next(err)
  )

}

module.exports = router;