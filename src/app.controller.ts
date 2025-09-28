import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
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
      message: '如果你看到这个消息，说明应用运行正常！'
    };
  }

  // 添加一个测试路由来验证路由是否工作
  @Get('test')
  getTest() {
    return {
      message: '测试路由工作正常！',
      usersApiInfo: '请访问 /users 来测试用户API'
    };
  }
}
