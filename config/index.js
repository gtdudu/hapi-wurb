require('babel-register');
require('./loadEnvironnement')

if (process.env.NODE_ENV === "production") {
  require('./server-prod');
}
if (process.env.NODE_ENV === "development") {
  require('./server-dev');
}
