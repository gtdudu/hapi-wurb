"use strict"
// import { validateJwt } from '../authentification'
import jwtConfig from '../config/jwtConfig'
import redisClient from '../config/redis'

const validateJwt = (decoded, request, callback) => {
  console.log("decoded here", decoded);
  // do your checks to see if the session is valid
  redisClient.get(decoded.id, (rediserror, reply) => {
    /* istanbul ignore if */
    if (rediserror) {
      console.log(rediserror);
    }
    let session;
    if (reply) {
      session = JSON.parse(reply);

      console.log("session: ", session);
    } else {
      // unable to find session in redis ... reply is null
      return callback(rediserror, false);
    }

    if (session.valid === true) {
      return callback(rediserror, true);
    }
              return callback(rediserror, true);

    // return callback(rediserror, false);
  });
};

/* Plugin definition */
const register = server => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: jwtConfig.secret,
    validateFunc: validateJwt,
    verifyOptions: jwtConfig.verifyOptions
  });
}

/* Plugin attrs */
register.attributes = {
  name: 'whireAuthPlugin'
};

/* Plugin export */
exports.default = register
module.exports = exports.default
