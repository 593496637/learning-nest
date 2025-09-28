import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  
  // 🎯 设置全局 API 前缀
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT ?? 3000);
  
  console.log('🚀 应用已启动在 http://localhost:3000');
  console.log('📚 API 文档: http://localhost:3000/api');
}
bootstrap();
