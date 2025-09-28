import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🎯 获取配置服务
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动移除不在 DTO 中的属性
    forbidNonWhitelisted: true, // 如果有额外属性就报错
    transform: true, // 自动转换类型
  }));
  
  // 🎯 使用配置文件中的 API 前缀
  app.setGlobalPrefix(appConfig.apiPrefix);
  
  // 🎯 CORS 配置
  app.enableCors({
    origin: appConfig.corsOrigin.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // 🎯 使用配置文件中的端口
  await app.listen(appConfig.port);
  
  // 🎯 启动信息
  console.log('🚀 ===============================================');
  console.log(`🎉 ${appConfig.appName} v${appConfig.appVersion}`);
  console.log(`🌍 环境: ${appConfig.nodeEnv.toUpperCase()}`);
  console.log(`🔗 应用地址: http://localhost:${appConfig.port}/${appConfig.apiPrefix}`);
  console.log(`📋 健康检查: http://localhost:${appConfig.port}/${appConfig.apiPrefix}/health`);
  console.log(`👥 用户API: http://localhost:${appConfig.port}/${appConfig.apiPrefix}/users`);
  console.log(`📝 日志级别: ${appConfig.logLevel.toUpperCase()}`);
  console.log('🚀 ===============================================');
}
bootstrap();
