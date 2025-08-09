import { Injectable } from "@nestjs/common";
import { ShortenUrlRepository } from "../repository/shorten-url-repository";
import { ShortenUrl } from "../../enterprise/shortenUrl";
import { error } from "console";



interface FindShortenUrlByIdUseCaseRequest {
    id: string;
}


@Injectable()
export class FindShortenUrlByIdUseCase {
    constructor (private readonly shortenUrlRepository:ShortenUrlRepository) {}

    async execute({id}:FindShortenUrlByIdUseCaseRequest):Promise<ShortenUrl> {
        const result = await this.shortenUrlRepository.findById(id);

        if(!result) {
            throw error("cant find url for this id")
        }
        return result;
    }
}