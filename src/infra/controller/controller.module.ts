import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateShortenUrlController } from './create-shorten-url.controller';
import { CreateShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/create-shorten-url';
import { DeleteShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/delete-shorten-url';
import { FindShortenUrlByIdUseCase } from 'src/domain/shortenUrl/application/useCases/find-url-by-id';
import { GetUrlByShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/get-shroten-url';
import { DeleteShortenUrlController } from './delete-shorten-url.controller';
import { FindShortenUrlByIdController } from './find-shorten-url-by-id.controller';
import { GetUrlByShortenUrlController } from './get-url.controller';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CreateShortenUrlController,
        DeleteShortenUrlController,
        FindShortenUrlByIdController,
        GetUrlByShortenUrlController
    ],
    providers: [
        CreateShortenUrlUseCase,
        DeleteShortenUrlUseCase,
        FindShortenUrlByIdUseCase,
        GetUrlByShortenUrlUseCase

    ],
})
export class ControllersModule { }
