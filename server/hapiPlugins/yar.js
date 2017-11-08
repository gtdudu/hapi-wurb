import yar from 'yar'

const yarPlugin = {
  register: yar,
  options: {
    storeBlank: false,
    cookieOptions: {
      password: 'the-password-must-be-at-least-32-characters-long',
      isSecure: false,
    }
  }
}

module.exports = yarPlugin
