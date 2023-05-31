import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  @Delete('/del-img/:id')
  delImg(@Param('id') id: number) {
    return this.usersService.delImg(id);
  }

  @UseInterceptors(FileInterceptor("file",{
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename:(req, file, callback)=> callback(null, Date.now()+"_"+file.originalname)
    })
  }))
  @Post('/upload-avt/:id')
  uploadAvt(@UploadedFile() file: Express.Multer.File,
  @Param('id') id: number
  ){
    return this.usersService.uploadAvt(id, file);
  }
}
