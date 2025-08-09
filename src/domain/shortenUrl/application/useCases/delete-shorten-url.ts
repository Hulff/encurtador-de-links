import { Injectable } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";

interface DeleteShortenUrlUseCaseRequest {
    id: string;
}

@Injectable()
export class DeleteShortenUrlUseCase {
    constructor(private readonly shortenUrlRepository: ShortenUrlRepository) { }

    async execute({
        id
    }: DeleteShortenUrlUseCaseRequest): Promise<string> {

        const result = await this.shortenUrlRepository.delete(id)

        if (!result) {
            throw new Error("Failed to delete shortened URL");
        }
        return result;
    }
}