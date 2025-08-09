import { ShortenUrlRepository } from "src/domain/shortenUrl/application/repository/shorten-url-repository";
import { ShortenUrl } from "src/domain/shortenUrl/enterprise/shortenUrl";


export class inMemoryShortenUrlRepository implements ShortenUrlRepository {
    items: ShortenUrl[] = []

    create(entity: ShortenUrl): Promise<ShortenUrl> {
        this.items.push(entity);
        return Promise.resolve(entity)

    }
    delete(id: string): Promise<string> {
        this.items = this.items.filter((e) => e.getId() !== id)
        return Promise.resolve("deletado com sucesso");
    }
    findById(id: string): Promise<ShortenUrl | null> {
        const item = this.items.findIndex((e) => e.getId() === id);
        return Promise.resolve(item !== -1 ? this.items[item] : null);
    }
    getUrl(shortenedUrl: string): Promise<ShortenUrl | null> {
        const item = this.items.findIndex((e) => e.getShortId() === shortenedUrl);
        return Promise.resolve(item !== -1 ? this.items[item] : null);
    }
}