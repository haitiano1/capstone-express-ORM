import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static("."))

  //swagger
  const config = new DocumentBuilder().setTitle("Swagger NestJs").setVersion("113").setDescription("đây là mô tả").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger",app, document);

  await app.listen(8080);
}
bootstrap();
