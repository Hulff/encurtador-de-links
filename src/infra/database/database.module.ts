import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenUrlRepository } from 'src/domain/shortenUrl/application/repository/shorten-url-repository';
import { MongoShortenUrlRepository } from './mongo/repository/shorten-url-mongo-repository';
import { ShortenUrl, ShortenUrlSchema } from './mongo/schema/shorten-url.schema';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://root:root@localhost:27017/urlshortenerdb?authSource=admin',
        ),
        MongooseModule.forFeature([
            { name: ShortenUrl.name, schema: ShortenUrlSchema },
        ]),
    ],
    providers: [
        {
            provide: ShortenUrlRepository,
            useClass: MongoShortenUrlRepository,
        },
    ],
    exports: [MongooseModule, ShortenUrlRepository],
})
export class DatabaseModule { }
