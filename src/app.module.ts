import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controller/controller.module';

@Module({
  imports: [
    ControllersModule
  ],
})
export class AppModule {}
