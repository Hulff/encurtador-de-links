import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { GetUrlByShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/get-shorten-url';

@Controller('url')
export class GetUrlByShortenUrlController {
    constructor(private readonly getUrl: GetUrlByShortenUrlUseCase) { }

    @Get()
    @HttpCode(200)
    async handle(@Query('shortId') shortId: string) {
        const result = await this.getUrl.execute({ shortenUrl: shortId });
        if (!result) {
            throw new Error('Failed to find full URL');
        }
        return result;
    }
}
