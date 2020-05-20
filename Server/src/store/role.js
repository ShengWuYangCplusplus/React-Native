var db = require("../config/db.js");


exports.list = (req) => new Promise((resolve, reject) => {
  let index = req.query.index;
  let size = req.query.size;
  if (!index || !size) {
    reject('index,size是必须的')
    return
  }
  db.getConnection((err, connection) => {
    if (err) {
      reject(err)
    }
    let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM user_role r WHERE r.ID >= ANY(select t.ID from (select * from user_role limit ${index * size},${size}) as t) LIMIT ${size};`
    connection.query(sql, null, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      connection.query('SELECT FOUND_ROWS() as total;', null, (err, total, fields) => {
        if (err) {
          reject(err)
        }
        let obj = {
          index: parseInt(index),
          size: parseInt(size),
          total: total[0].total,
          data: results
        }
        connection.release()
        resolve(obj)
      })
    })

  })
})
