import { Injectable } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";
import { ShortenUrl, ShortenUrlProps } from "../../enterprise/shortenUrl";
import { nanoid } from "nanoid";

interface CreateShortenUrlUseCaseRequest {
    originalUrl: string;
    id?: string

}

@Injectable()
export class CreateShortenUrlUseCase {
    constructor(private readonly shortenUrlRepository: ShortenUrlRepository) { }

    async execute(props: CreateShortenUrlUseCaseRequest): Promise<ShortenUrl> {
        const shortenedUrl = nanoid(7);
        
        const newEntity = ShortenUrl.create({
            originalUrl: props.originalUrl,
            shortId: shortenedUrl,
            id: props.id

        })
        const result = await this.shortenUrlRepository.create(newEntity);

        if (!result) {
            throw new Error("Failed to create shortened URL");
        }
        return result;
    }
}