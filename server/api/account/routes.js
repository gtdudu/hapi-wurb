import {
  getUserAccount,
  getAccounts,
  deleteUserAccount
} from './handler'

module.exports = [
  {
    method: 'GET',
    path: '/api/accounts',
    handler: getAccounts,
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['base']
      },
    }

  },
  {
    method: 'GET',
    path: '/api/account/me',
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['base', 'admin']
      },
    },
    handler: getUserAccount
  },
  {
    method: 'DELETE',
    path: '/api/account',
    config: {
      auth: 'jwt',
    },
    handler: deleteUserAccount
  }
]
