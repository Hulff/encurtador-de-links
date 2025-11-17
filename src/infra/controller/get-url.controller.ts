import { Controller, Get, HttpCode, Query, Res } from "@nestjs/common";
import express from "express";
import { GetUrlByShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/get-shorten-url';

@Controller('url')
export class GetUrlByShortenUrlController {
    constructor(private readonly getUrl: GetUrlByShortenUrlUseCase) { }

    @Get()
    async handle(
        @Query('shortId') shortId: string,
        @Res() res: express.Response
    ) {
        const result = await this.getUrl.execute({ shortenUrl: shortId });

        if (!result) {
            return res.status(404).send("URL not found");
        }

        return res.redirect(302, result.originalUrl);
    }
}
