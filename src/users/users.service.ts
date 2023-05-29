import { async } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {

  private prisma = new PrismaClient()

  async getUser() {
    const data =  await this.prisma.nguoi_dung.findMany()
    throw new HttpException({ data }, HttpStatus.ACCEPTED)
  }
  async imgUserSave(id: number){
    const data = await this.prisma.luu_anh.findFirst({
      where:{
        nguoi_dung_id: Number(id)
      }
    })
    return data
  }
  async imgUserCreate(id: number){
    const data = await this.prisma.hinh_anh.findFirst({
      where:{
        nguoi_dung_id: Number(id)
      }
    })
    return data
  }
}
