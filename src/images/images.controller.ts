import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {searchImg } from './entities/image.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard("jwt"))
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Get('/get-img')
  getImg() {
    return this.imagesService.getImg();
  }
  @Get('/img-search')
  imgSearch(@Body() body: searchImg) {
    return this.imagesService.imgSearch(body);
  }
  @Get('/img-info/:id')
  imgInfo(@Param('id') id: number) {
    return this.imagesService.imgInfo(id);
  }
  @Get('/img-cmt/:id')
  imgCmt(@Param('id') id: number) {
    return this.imagesService.imgCmt(id);
  }
  @Get('/img-save/:id')
  infoSave(@Param('id') id: number) {
    return this.imagesService.infoSave(id);
  }


}
