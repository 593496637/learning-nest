import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about')
  getAbout(): string {
    return this.appService.getAbout();
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return `用户ID：${id}`;
  }

  @Get('search')
  searchUsers(@Query('name') name: string, @Query('age') age: string): string {
    return `搜索用户 - 姓名：${name},年龄：${age}`;
  }

  @Post('user')
  createUser(@Body() userData: CreateUserDto): string {
    return `创建用户：姓名=${userData.name},年龄=${userData.age},邮箱=${userData.email}`;
  }
}

/**
 * 
 * 现在测试这些新端点：

GET http://localhost:3000/api
GET http://localhost:3000/api/user/123
GET http://localhost:3000/api/search?name=张三&age=25
 * 
 */
