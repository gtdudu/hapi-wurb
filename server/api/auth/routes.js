import {
  login,
  // verifyToken,
  validateToken,
  signup,
  logout,
} from './handler'
import {
  passwordUpdate,
  askPasswordRest,
  passwordReset
} from './passwordHandler'
import Joi from 'joi'

module.exports = [
  {
    method: 'POST',
    path: '/api/login',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: login
  },
  {
    method: 'POST',
    path: '/api/signup',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          password: Joi.string().required(),
          confirmPassword: Joi.string().required()
        }
      }
    },
    handler: signup
  },
  {
    method: 'GET',
    path: '/api/logout',
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['base']
      }
    },
    handler: logout
  },
  {
    method: 'POST',
    path: '/api/passwordUpdate',
    config: {
      auth: 'jwt',
      validate: {
        payload: {
          currentPassword: Joi.string().required(),
          newPassword: Joi.string().required(),
          newPasswordVerif: Joi.string().required()
        }
      }
    },
    handler: passwordUpdate
  },
  {
    method: 'POST',
    path: '/api/passwordReset',
    config: {
      auth: false,
      validate: {
        payload: {
          password: Joi.string().required(),
          passwordVerif: Joi.string().required(),
          token: Joi.string().required()
        }
      }
    },
    handler: passwordReset
  },
  {
    method: 'POST',
    path: '/api/askPasswordReset',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().required()
        }
      }
    },
    handler: askPasswordRest
  },
  // {
  //   method: 'POST',
  //   path: '/api/verifyToken/{provider}/{signup?}',
  //   config: {
  //     auth: false
  //   },
  //   handler: verifyToken
  // },
  {
    method: 'POST',
    path: '/api/validateAccount',
    config: {
      auth: false,
      validate: {
        payload: {
          token: Joi.string().required()
        }
      }
    },
    handler: validateToken
  }
]
