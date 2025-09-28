import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')  // 改为 'api/users' 保持一致
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userData: CreateUserDto) {
    try {
      const user = this.usersService.create(userData);
      return {
        success: true,
        message: '用户创建成功',
        data: user,
      };
    } catch (error: unknown) {
      throw new HttpException(
        `创建用户失败: ${error instanceof Error ? error.message : String(error)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return {
      success: true,
      data: this.usersService.findAll()
    };
  }

  @Get('stats')
  getStats() {
    return {
      success: true,
      data: this.usersService.getStats()
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      data: user,
      message: '用户查询成功',
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateUserDto>,
  ) {
    const user = this.usersService.update(id, updateData);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      data: user,
      message: '用户更新成功',
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const result = this.usersService.remove(id);
    if (!result) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      message: '用户删除成功',
    };
  }
}
