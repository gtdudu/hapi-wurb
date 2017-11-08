import Jwt from 'jsonwebtoken'
import jwtConfig from './config/jwtConfig'
import { redisClient } from './config/redis'
import { Recruiter } from './models/recruiter'
import { v4 } from 'uuid';

/*
 Used to validate the jwt passed in "authorization" header when "auth" config is set to "jwt"
 It's here we check if the token data is consistent with database data.
 This function is called only by Jwt-auth, so keep the error prone callback...
*/
export const validateJwt = (decoded, req, cb) => {
  if (decoded.whireId) {
    return redisClient.get(decoded.whireId, (err, res) => {
      if (err || !res) {
        console.log("Error: invalid Jwt : ", err, res)
        return cb(err, null)
      }

      return cb(null, true)
    })
  }
  console.log('missing props in JWT');
  return cb(null, false)
}


/**
* Check if a JWT is currently in redis.
* @arg token: token to Check
* @arg cb: callback (error prone style) used when check is done.
* @return {Promise} Promise is NEVER rejected, because it's simpler in the workflow for now.
*/
export const isTokenValid = (token) => { //eslint-disable-line
  return new Promise((resolve, reject) => {
    if (typeof token !== "string") resolve(false, "token format is not right")//eslint-disable-line
    else {
      redisClient.hget('jwts', token, (err, res) => {
        if (err) {
          console.log('Error when checking token validity :', err)
          reject(err)
        } else if (res === null) resolve(false, "token absent from redis")
        else resolve(true)
      })
    }
  })
}

/**
* Decode a JWT and return data contained.
* @arg token: the JWT to Decode
* @return Object : data contained into JWT
*/
export const getJwtData = token => {
  return Jwt.verify(token, jwtConfig.secret)
}

/**
* Fetch a user based on a token.
* @param token {string} JWT
* @return Promise
*/
export const getUserFromToken = token => {
  return new Promise((resolve, reject) => {
    const dataFromToken = getJwtData(token);

    Recruiter.findOne({email: dataFromToken.email}, (err, user) => {
      if (err) {
        console.log('user in token not founded in Mongo');
        return reject(err)
      }
      return resolve(user)
    })
  })
}

/**
* @param user: user object like returned by mongo
* @param toRedis: {boolean} if true save new token to redis. default to true.
* @return {Promise} JWT token
* TODO: Define which user data and global data to include in token.
**/
export const createToken = (user = null, toRedis = true) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      return reject('user is undefined');
    }

    const session = {
      valid: true, // this will be set to false when the person logs out
      id: v4(), // a random session id
      exp: new Date().getTime() + (30 * 60 * 1000), // expires in 30 minutes time
      firstName: user.firstName,
      email: user.email,
      scope: user.scope
    }

    // sign the session as a JWT
    const token = Jwt.sign(session, jwtConfig.secret)

    // check that created token is valid
    console.log('createToken', Jwt.verify(token, jwtConfig.secret));

    if (toRedis) {
      // create the session in Redis
      redisClient.set(session.id, JSON.stringify(session));
    }
    resolve(token)
  })
}


export const regenerateToken = token => {
  return new Promise((resolve, reject) => {
    let user;
    getUserFromToken(token)
    .then(res => {
      user = res;
      return createToken(user)
    })
    .then(token => {
      redisClient.del(user.whireId, token)
      resolve(token)
    })
    .catch(error => {
      reject(error)
    })
  })
}

/**
 * Check request Headers to extract JWT if existing.
 * @param headers : headers from hapi request
 * @return token or false.
 */
export const getTokenFromHeader = headers => {
  let token = false
  if (!headers.cookie) return token
  const cookies = headers.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split('=')
    if (parts[0].trim() === 'wolfJwt') {
			token = decodeURIComponent(parts[1]);
		}
    if ((i + 1) === cookies.length) {
			return token;
		}
  }
}
