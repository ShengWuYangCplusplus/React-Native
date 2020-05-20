const allRoles = [1, 2, 3, 4, 5];
module.exports = {
  jwtSecret: 'testsercret',
  jwtOptions: {
    issuer: 'engoo.cn',
    expiresIn: '3d'
  },
  anonymouns: [
    {
      path: '/token',
      method: '*'
    }, {
      path: '/static',
      method: 'GET'
    },
    {
      path: '/api/teamtype',
      method: 'GET'
    },
    {
      path: '/upload',
      method: 'POST'
    },
    {
      path: '/rnupload/image',
      method: 'POST'
    },
    {
      path: '/api/site/many',
      method: 'POST'
    },
    {
      path: '/api/site',
      method: 'GET'
    }
  ],
  path_role_arr: [
    {
      path: '/api/users',
      roles: [1]
    },
    {
      path: '/api/users/detail',
      roles: [1]
    },
    {
      path: '/api/org',
      roles: [1, 2]
    },
    {
      path: '/api/role',
      roles: allRoles
    },
    {
      path: '/api/department',
      roles: allRoles
    },
    {
      path: '/api/alarm',
      roles: allRoles
    },
    {
      path: '/api/alarm/some',
      roles: allRoles
    },
    {
      path: '/api/alarm/total',
      roles: allRoles
    },
  ]
}