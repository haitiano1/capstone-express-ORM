import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { searchImg } from './entities/image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('/get-img')
  getImg() {
    return this.imagesService.getImg();
  }

  @Get('/img-search')
  imgSearch(@Body() body:searchImg){
    return this.imagesService.imgSearch(body);
  }

}
