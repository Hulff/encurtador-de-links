import { CreateShortenUrlUseCase } from './../../domain/shortenUrl/application/useCases/create-shorten-url';
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

@Controller('shorten-url')
export class CreateShortenUrlController {
    constructor(private readonly CreateShortenUrl: CreateShortenUrlUseCase) { }
    @Post()
    @HttpCode(201)
    async handle(@Body() body: { url: string }) {
        const result = await this.CreateShortenUrl.execute({
            originalUrl: body.url
        });
        if (!result) {
            throw new Error('Failed to create shortened URL');
        }
        return result;
    }
}