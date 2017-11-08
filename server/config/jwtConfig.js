const jwtConfig = {
  secret: process.env.JWT_SECRET,
  verifyOptions: {
    ignoreExpiration: false,
    algorithms: ['HS256'],
  },
}

module.exports = jwtConfig;
