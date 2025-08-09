import { ShortenUrl, ShortenUrlProps } from "../../enterprise/shortenUrl"

export abstract class ShortenUrlRepository {
    abstract create(entity: ShortenUrl): Promise<ShortenUrl>;
    abstract delete(id:string): Promise<string>;
    abstract findById(id: string): Promise<ShortenUrl | null>;
    abstract getUrl(shortenedUrl: string): Promise<ShortenUrl | null>;
}