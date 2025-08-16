import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`], // escolhe o env pelo NODE_ENV
    }),
    ControllersModule
  ],
})
export class AppModule {}
