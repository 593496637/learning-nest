export interface AppConfig {
  port: number;
  apiPrefix: string;
  nodeEnv: string;
  appName: string;
  appVersion: string;
  logLevel: string;
  corsOrigin: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'Nest.js App',
    appVersion: process.env.APP_VERSION || '1.0.0',
    logLevel: process.env.LOG_LEVEL || 'info',
    corsOrigin: process.env.CORS_ORIGIN || '*',
  } as AppConfig,
  
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'nest_app',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
  } as DatabaseConfig,
  
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  } as JwtConfig,
});
