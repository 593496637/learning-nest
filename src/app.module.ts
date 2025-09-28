import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // 🎯 配置模块 - 根据环境加载不同配置
    ConfigModule.forRoot({
      isGlobal: true, // 使配置在整个应用中全局可用
      load: [configuration], // 加载我们的配置文件
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // 先加载环境特定的配置
        '.env', // 然后加载默认配置
      ],
      cache: true, // 缓存配置以提高性能
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
