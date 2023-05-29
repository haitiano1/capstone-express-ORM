import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/get-user')
  getUser() {
    return this.usersService.getUser();
  }
  @Get('/user-save/:id')
  imgUserSave(@Param('id') id: number) {
    return this.usersService.imgUserSave(id);
  }
  @Get('/user-create/:id')
  imgUserCreate(@Param('id') id: number) {
    return this.usersService.imgUserCreate(id);
  }
}
