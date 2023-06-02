import { async } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, nguoi_dung } from '@prisma/client';

@Injectable()
export class UsersService {

  private prisma = new PrismaClient()

  async getUser() {
    const data = await this.prisma.nguoi_dung.findMany()
    throw new HttpException({ data }, HttpStatus.ACCEPTED)
  }
  async imgUserSave(id: number) {
    const data = await this.prisma.luu_anh.findFirst({
      where: {
        nguoi_dung_id: Number(id)
      }
    })
    return data
  }
  async imgUserCreate(id: number) {
    const data = await this.prisma.hinh_anh.findFirst({
      where: {
        nguoi_dung_id: Number(id)
      }
    })
    return data
  }
  async delImg(id: number) {
    const data = await this.prisma.hinh_anh.deleteMany({
      where: {
        nguoi_dung_id: Number(id)
      }
    })
    return data
  }
  async uploadAvt(id: number, file: Express.Multer.File) {

    //lưu hình
    //lấy thông tin user muốn lưu theo userid
    let getUserId = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(id)
      }
    })
    getUserId.anh_dai_dien = file.filename;
    //gọi truy vấn lưu hình

    await this.prisma.nguoi_dung.update({
      data: getUserId, where: {
        nguoi_dung_id: Number(id)
      }
    })

    return "upload thành công";
  }

  async updateUser(body: nguoi_dung) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: +body.nguoi_dung_id,
      }
    })
    if (checkUser) {
      const mat_khau = bcrypt.hashSync(body.mat_khau, 10)
      const newUser = { ...body, mat_khau }
      await this.prisma.nguoi_dung.update({
        data: newUser, where: {
          nguoi_dung_id: +body.nguoi_dung_id
        }
      })
      return {newUser, message:'Cập nhật thành công'}
    }
    return 'Cập nhật thất bại'
  }
}
