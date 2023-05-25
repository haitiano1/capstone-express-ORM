import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { nguoi_dung } from '@prisma/client';
import { UserLogin } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userLogin: UserLogin): Promise<string>{
    return this.authService.login(userLogin)
  }

  @Post('/signup')
  signUp(@Body() body: nguoi_dung){
  return this.authService.signUp(body)
  }

}
