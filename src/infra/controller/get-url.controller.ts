import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { GetUrlByShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/get-shroten-url';

@Controller('url')
export class GetUrlByShortenUrlController {
    constructor(private readonly getUrl: GetUrlByShortenUrlUseCase) { }
    @Get()
    @HttpCode(200)
    async handle(@Body() body: { url: string }) {
        const result = await this.getUrl.execute({ shortenUrl: body.url });
        if (!result) {
            throw new Error('Failed to find full URL');
        }
        return result;
    }
}