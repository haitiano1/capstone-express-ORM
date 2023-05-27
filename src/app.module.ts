import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule,
    JwtModule.register({global: true}),
    ImagesModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
