// infra/repository/mongo-shorten-url.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortenUrlRepository } from 'src/domain/shortenUrl/application/repository/shorten-url-repository';
import { ShortenUrlDocument, ShortenUrlSchemaName } from '../schema/shorten-url.schema';
import { ShortenUrl } from 'src/domain/shortenUrl/enterprise/shortenUrl';
import { ShortenUrlMapper } from '../mapper/shorten-url-mapper';

@Injectable()
export class MongoShortenUrlRepository implements ShortenUrlRepository {
    constructor(
        @InjectModel(ShortenUrlSchemaName) private shortenUrlModel: Model<ShortenUrlDocument>,
    ) { }

    async create(entity: ShortenUrl): Promise<ShortenUrl> {
        const created = new this.shortenUrlModel({
            originalUrl: entity.getOriginalUrl(),
            shortId: entity.getShortId(),
            createdAt: entity.getCreatedAt(),
            clicks: entity.getClicks(),
            id: entity.getId(),
        });
        const saved = await created.save();
        return ShortenUrlMapper.toDomain(saved);
    }

    async delete(id: string): Promise<string> {
        await this.shortenUrlModel.deleteOne({ id });
        return id;
    }
    async findById(id: string): Promise<ShortenUrl | null> {
        const doc = await this.shortenUrlModel.findOne({ id });
        return doc ? ShortenUrlMapper.toDomain(doc) : null;
    }
    async getUrl(shortenedUrl: string): Promise<ShortenUrl | null> {
        const doc = await this.shortenUrlModel.findOne({ shortId: shortenedUrl });
        return doc ? ShortenUrlMapper.toDomain(doc) : null;
    }

}
