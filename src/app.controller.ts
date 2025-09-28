import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppConfig, DatabaseConfig } from './config/configuration';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService, // 🎯 注入配置服务
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    const appConfig = this.configService.get<AppConfig>('app');
    const dbConfig = this.configService.get<DatabaseConfig>('database');
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: appConfig.nodeEnv,
      version: appConfig.appVersion,
      service: appConfig.appName,
      port: appConfig.port,
      apiPrefix: appConfig.apiPrefix,
      logLevel: appConfig.logLevel,
      database: {
        host: dbConfig.host,
        port: dbConfig.port,
        name: dbConfig.name,
        // 不要在生产环境暴露敏感信息
        user: appConfig.nodeEnv === 'development' ? dbConfig.user : '***',
      },
      message: '🎉 环境变量配置成功！',
      endpoints: {
        home: `/${appConfig.apiPrefix}`,
        health: `/${appConfig.apiPrefix}/health`,
        config: `/${appConfig.apiPrefix}/config`,
        users: `/${appConfig.apiPrefix}/users`,
        userStats: `/${appConfig.apiPrefix}/users/stats`
      }
    };
  }

  @Get('config')
  getConfig() {
    const appConfig = this.configService.get<AppConfig>('app');
    
    // 只在开发环境暴露完整配置
    if (appConfig.nodeEnv !== 'development') {
      return {
        message: '配置信息仅在开发环境可见',
        environment: appConfig.nodeEnv
      };
    }
    
    return {
      app: appConfig,
      database: this.configService.get<DatabaseConfig>('database'),
      jwt: {
        // 不暴露真实的 JWT 密钥
        secret: '***',
        expiresIn: this.configService.get('jwt.expiresIn'),
      },
      envVars: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        API_PREFIX: process.env.API_PREFIX,
      }
    };
  }
}
