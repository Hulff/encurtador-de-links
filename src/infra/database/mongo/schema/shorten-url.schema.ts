// infra/schemas/shorten-url.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShortenUrlDocument = ShortenUrl & Document;

export const ShortenUrlSchemaName = 'ShortenUrl';

@Schema({ collection: 'shortenUrls' })
export class ShortenUrl {
    @Prop({ required: true })
    originalUrl: string;

    @Prop({ required: true })
    shortId: string;

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;

    @Prop({ required: true, default: 0 })
    clicks: number;

    @Prop({ required: true })
    id: string;
}

export const ShortenUrlSchema = SchemaFactory.createForClass(ShortenUrl);
