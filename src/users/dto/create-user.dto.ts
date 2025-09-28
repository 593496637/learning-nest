import { IsEmail, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNumber({}, { message: '年龄必须是数字' })
  @Min(18, { message: '年龄不能小于18岁' })
  @Max(100, { message: '年龄不能大于100岁' })
  age: number;
}
