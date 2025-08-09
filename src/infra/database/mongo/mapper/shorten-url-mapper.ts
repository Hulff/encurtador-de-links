import { ShortenUrl } from 'src/domain/shortenUrl/enterprise/shortenUrl';
import { ShortenUrlDocument } from '../schema/shorten-url.schema';

export class ShortenUrlMapper {
    static toDomain(doc: ShortenUrlDocument): ShortenUrl {
        return ShortenUrl.create({
            originalUrl: doc.originalUrl,
            shortId: doc.shortId,
            createdAt: doc.createdAt,
            clicks: doc.clicks,
            id: doc.id,
        });
    }

    static toPersistence(entity: ShortenUrl): Partial<ShortenUrlDocument> {
        return {
            originalUrl: entity.getOriginalUrl(),
            shortId: entity.getShortId(),
            createdAt: entity.getCreatedAt(),
            clicks: entity.getClicks(),
            id: entity.getId(),
        };
    }
}
