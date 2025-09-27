import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(userData: CreateUserDto): User {
    const user = new User(userData.name, userData.email, userData.age);
    this.users.push(user);
    return user;
  }
}
