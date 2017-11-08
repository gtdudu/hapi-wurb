require('babel-register');
const colors = require('colors/safe');
const configureEnv = require('./loadEnvironment').default;
const createAdmin = require('./fixtures/users').default;

const envConfig = {
  devEnv: '.env_dev',
  prodEnv: '.env_prod',
  testEnv: '.env_test',
}

configureEnv(envConfig)
  .then(loadedEnv => {
    // create default admin user
    createAdmin();

    if (process.env.NODE_ENV === 'production') {
      console.log(colors.yellow('launching app in production mode with env:'));
      console.log(colors.yellow(loadedEnv));
      require('./server-prod');
      return;
    }

    console.log('iufhezauihfiuzeahfaui');

    if (process.env.NODE_ENV === 'development') {
     console.log(colors.yellow('launching app in development mode with env:'));
      console.log(colors.yellow(loadedEnv));
      require('./server-dev');
    }
  })
  .catch(err => console.log(colors.red(err)));
