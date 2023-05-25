import { PrismaClient, nguoi_dung } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLogin } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {

  }
  private prisma = new PrismaClient();

  async login(userLogin: UserLogin): Promise<string> {

    //check email
    let { email, password } = userLogin;
    let checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email
      }
    })
    if (checkUser) {
      //check pass
      if (checkUser.mat_khau == password) {
        //tạo token
        let token = this.jwtService.signAsync({ data: checkUser }, {
          expiresIn: "15m",
          secret: this.configService.get("SECRET_KEY")
        })
        //trả token

        return token
      } else {
        // return "Mật khẩu không đúng"
        throw new NotFoundException("Mật khẩu không đúng")
      }

    } else {
      throw new NotFoundException("Email không đúng")

    }
  }

  async signUp(user: nguoi_dung) {
    let { email } = user;
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email
      }
    })
    if (checkEmail) {
      if (checkEmail.email === user.email) {
        throw new BadRequestException("Email đã tồn tại")
      }
    }
    const newUser = await this.prisma.nguoi_dung.create({ data: user });
    return newUser;
  }
}
