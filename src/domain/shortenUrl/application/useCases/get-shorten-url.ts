import { Injectable, NotFoundException } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";

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
            throw new NotFoundException(`Cannot find URL for shortId "${shortenUrl}"`);
        }

        return { originalUrl: result.getOriginalUrl() };
    }
}
