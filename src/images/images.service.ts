import { PrismaClient } from '@prisma/client';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { async } from 'rxjs';
import { searchImg } from './entities/image.entity';



@Injectable()
export class ImagesService {
  private prisma = new PrismaClient()

  async getImg() {
    const data = await this.prisma.hinh_anh.findMany()
    throw new HttpException({ data }, HttpStatus.ACCEPTED)
  }
  async imgSearch(name: searchImg){
    const data = await this.prisma.hinh_anh.findMany({
      where:{
        ten_hinh: name.name
      }
    })
    return data
  }
}
