import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ShortenUrlRepository } from 'src/domain/shortenUrl/application/repository/shorten-url-repository';
import { MongoShortenUrlRepository } from './mongo/repository/shorten-url-mongo-repository';
import { ShortenUrl, ShortenUrlSchema } from './mongo/schema/shorten-url.schema';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI'),
            }),
        }),
        MongooseModule.forFeature([
            { name: ShortenUrl.name, schema: ShortenUrlSchema },
        ]),
    ],
    providers: [
        DatabaseService,
        {
            provide: ShortenUrlRepository,
            useClass: MongoShortenUrlRepository,
        },
    ],
    exports: [MongooseModule, ShortenUrlRepository, DatabaseService],
})
export class DatabaseModule { }
