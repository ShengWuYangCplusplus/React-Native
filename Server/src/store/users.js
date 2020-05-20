var db = require("../config/db.js");
var sd = require('silly-datetime')

exports.validate = user =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        "SELECT A.ID as id, A.UserName as name, A.RoleId as roleId,A.DepartmentId as departmentId,A.Account as account FROM userinfo as A WHERE A.Account=? and A.Password=?;",
        [user.username, user.password],
        (err, results, fileds) => {
          if (err) {
            reject(err);
          }
          connection.release();
          resolve(results);
        }
      );
    })
  })


exports.list = (req) => new Promise((resolve, reject) => {
  let index = req.query.index;
  let size = req.query.size;
  if (!index || !size) {
    reject('index,size是必须的')
    return
  }
  db.getConnection((err, connection) => {
    if (err) {
      reject('db connect error')
    }
    let sql;
    if (req.query.username != null) {
      sql = `SELECT SQL_CALC_FOUND_ROWS *,d.department,r.role FROM (userinfo u INNER JOIN user_role r 
        ON u.RoleId=r.id ) INNER JOIN department d on u.DepartmentId=d.id and u.UserName LIKE '%${req.query.username}%' AND u.ID >=ANY(select t.ID from (select * from userinfo limit ${index * size},${size}) as t) LIMIT ${size};`
    } else {
      sql = `SELECT SQL_CALC_FOUND_ROWS *,d.department,r.role FROM (userinfo u join user_role r on u.RoleId=r.id) INNER JOIN department d on u.DepartmentId=d.id and u.ID >=ANY(select t.ID from (select * from userinfo limit ${index * size},${size}) as t) LIMIT ${size};`
    }
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


exports.detailUser = (id) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query("SELECT * FROM userinfo u WHERE u.ID=?;", [id], (err, results, fields) => {
        if (err) {
          reject(err)
        }
        connection.release()
        resolve(results[0])
      })
    })
  })

exports.updateUser = (req) =>
  new Promise((resolve, reject) => {
    if (!req.body.ID) {
      reject('id不能为空')
      return
    }
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      let temp = Object.entries(req.body).filter(item => item[0] != 'ID')
      let sql = "UPDATE userinfo SET ";
      for (let item of temp) {
        sql += `${item[0]} = '${item[1]}',`
      }
      sql = sql.substring(0, sql.length - 1);
      sql += ` WHERE ID=${req.body.ID};`
      connection.query(sql, null, (err, results, fields) => {
        if (err) {
          reject(err)
        }
        connection.release()
        resolve(results.serverStatus)
      })
    })
  })

exports.addUser = (req) =>
  new Promise((resolve, reject) => {
    let data = req.body;
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query("INSERT INTO userinfo (Account,UserName,Phone,Password,DepartmentId,RoleId) VALUES (?,?,?,?,?,?)", [data.Account, data.UserName, data.Phone, data.Password, data.DepartmentId, data.RoleId], (err, results, fields) => {
        if (err) {
          reject(err)
        }
        connection.release()
        resolve(results.serverStatus)
      })
    })
  })

exports.deleteUser = (ID) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query("DELETE FROM userinfo WHERE ID=?", [ID], (err, results, fields) => {
        if (err) {
          reject(err)
        }
        connection.release()
        resolve(results.serverStatus)
      })
    })
  })

exports.createLog = (user) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject("database connect error")
      }
      connection.query(
        "INSERT INTO login_log (account,name,role,time) VALUES(?,?,?,?)", [user.account, user.name, user.role, sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')], (err, results, fields) => {
          if (err) {
            reject("sql query error")
          }
          connection.release()
          resolve(results)
        }
      )
    })
  })

