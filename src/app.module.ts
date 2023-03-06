import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';

const DB =  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'leaveattendance',
  entities: [],
  synchronize: true,
})


@Module({
  imports: [
   DB,
   AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
