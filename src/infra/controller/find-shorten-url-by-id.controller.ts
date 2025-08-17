import { FindShortenUrlByIdUseCase } from 'src/domain/shortenUrl/application/useCases/find-url-by-id';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from "@nestjs/common";

@Controller('shorten-url')
export class FindShortenUrlByIdController{
    constructor(private readonly findShortenUrl: FindShortenUrlByIdUseCase) { }
    @Get()
    @HttpCode(200)
    async handle(@Query() query: { id: string }) {
        const result = await this.findShortenUrl.execute({ id: query.id });
        if (!result) {
            throw new Error('Failed to find shortened URL');
        }
        return result;
    }
}