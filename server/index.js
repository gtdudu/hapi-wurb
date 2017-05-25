require('babel-register');
var colors = require('colors/safe');
var configureEnv = require('./loadEnvironment').default;

var envConfig = {
  devEnv: '.env_dev',
  prodEnv: '.env_prod',
}

configureEnv(envConfig)
  .then((loadedEnv) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(colors.yellow('launching app in production mode with env:'));
      console.log(colors.yellow(loadedEnv));
      require('./server-prod')
    } else {
      console.log(colors.yellow('launching app in development mode with env:'));
      console.log(colors.yellow(loadedEnv));
      require('./server-dev');
    }
  })
  .catch(err => console.log(colors.red(err)));
