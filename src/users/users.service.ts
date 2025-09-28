import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(userData: CreateUserDto): User {
    const user = new User(userData.name, userData.email, userData.age);
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateData: Partial<CreateUserDto>) {
    const user = this.findOne(id);

    if (user) {
      Object.assign(user, updateData);
      return user;
    }
    return null;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getStats() {
    return {
      totalUsers: this.users.length,
      averageAge:
        this.users.length > 0
          ? this.users.reduce((sum, user) => sum + user.age, 0) /
            this.users.length
          : 0,
      oldestUser:
        this.users.length > 0
          ? Math.max(...this.users.map((user) => user.age))
          : 0,
      youngestUser:
        this.users.length > 0
          ? Math.min(...this.users.map((user) => user.age))
          : 0,
    };
  }
}
