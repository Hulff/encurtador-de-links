import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env', // carrega .env se NODE_ENV não existir
    }),
    ControllersModule
  ],
})
export class AppModule { }
