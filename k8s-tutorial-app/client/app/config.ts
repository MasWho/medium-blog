// Initialise environment variables

const devEnvVars = [
  {key: 'DB_NAME', value: 'tut-db'},
  {key: 'DB_USER', value: 'mason'},
  {key: 'DB_PASSWORD', value: 'test1234'},
  {key: 'DB_HOST', value: 'localhost'},
  {key: 'DB_PORT', value: '5432'},
];

const initialiseEnv = () => {
  for(const envVar of devEnvVars) {
    if(!process.env[envVar.key]) {
      process.env[envVar.key] = envVar.value;
    }
  }

  return true;
};

export default initialiseEnv;