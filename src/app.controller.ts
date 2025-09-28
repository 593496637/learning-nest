import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()  // 移除 'api' 前缀，使用全局前缀
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Nest.js Learning App',
      message: '🎉 全局前缀配置成功！',
      endpoints: {
        home: '/api',
        health: '/api/health',
        users: '/api/users',
        userStats: '/api/users/stats'
      }
    };
  }

  @Get('test')
  getTest() {
    return {
      message: '✅ 全局前缀测试成功！',
      globalPrefix: 'api',
      usersApiInfo: '请访问 /api/users 来测试用户API'
    };
  }
}
