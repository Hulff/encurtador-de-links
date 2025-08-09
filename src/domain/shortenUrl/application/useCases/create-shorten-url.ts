import { Injectable } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";
import { ShortenUrl, ShortenUrlProps } from "../../enterprise/shortenUrl";
import { v4 as uuidv4 } from "uuid"

interface CreateShortenUrlUseCaseRequest {
    originalUrl: string;
    id?: string

}

@Injectable()
export class CreateShortenUrlUseCase {
    constructor(private readonly shortenUrlRepository: ShortenUrlRepository) { }

    async execute(props: CreateShortenUrlUseCaseRequest): Promise<ShortenUrl> {
        const shortenedUrl = uuidv4().slice(0, 8);


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