import { DeleteShortenUrlUseCase } from 'src/domain/shortenUrl/application/useCases/delete-shorten-url';
import { Body, Controller, Delete, HttpCode, Param, Post } from "@nestjs/common";

@Controller('shorten-url')
export class DeleteShortenUrlController {
    constructor(private readonly deleteShortenUrl: DeleteShortenUrlUseCase) { }
    @Delete(":id")
    @HttpCode(204)
    async handle(@Param("id") id: string) {
        const result = await this.deleteShortenUrl.execute({ id: id });
        if (!result) {
            throw new Error('Failed to delete shortened URL');
        }
        return result;
    }
}