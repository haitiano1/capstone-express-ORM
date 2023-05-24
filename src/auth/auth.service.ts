import { PrismaClient ,nguoi_dung } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async login(userLogin: UserLogin): Promise<string>{

    //check email
    let {email, password} = userLogin;
    let checkUser = await this.prisma.nguoi_dung.findFirst({
      where:{
        email: email
      }
    })
    if(checkUser) {
      //check pass
      if(checkUser.mat_khau == password){
        //tạo token
        let token = this.jwtService.signAsync({ data: checkUser }, {
          expiresIn: "15m",
          secret: this.configService.get("SECRET_KEY")
        })
        //trả token

        return token
      }else{
      // return "Mật khẩu không đúng"
      throw new NotFoundException("Mật khẩu không đúng")
      }

    }else{
      throw new NotFoundException("Email không đúng")

    }



  }

  signUp(nguoiDung: nguoi_dung): string{
    return "đăng ký thành công"
  }




  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
