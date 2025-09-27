export class User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;

  constructor(name: string, email: string, age: number) {
    this.id = Math.floor(Math.random() * 1000000);
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
  }
}
