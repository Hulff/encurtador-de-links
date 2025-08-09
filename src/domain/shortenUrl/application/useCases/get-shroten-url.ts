import { Injectable } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";
import { ShortenUrl } from "../../enterprise/shortenUrl";
import { error } from "console";



interface GetShortenUrlUseCaseRequest {
    shortenUrl: string;
}
export interface GetShortenUrlUseCaseResponse {
    originalUrl: string;
}

@Injectable()
export class GetUrlByShortenUrlUseCase {
    constructor(private readonly shortenUrlRepository: ShortenUrlRepository) { }

    async execute({ shortenUrl }: GetShortenUrlUseCaseRequest): Promise<GetShortenUrlUseCaseResponse> {
        const result = await this.shortenUrlRepository.getUrl(shortenUrl);

        if (!result) {
            throw error("cant find url for this  shortened url")
        }
        return { originalUrl: result.getOriginalUrl() };
    }
}