import { inMemoryShortenUrlRepository } from 'test/repository/in-memory-shorten-url-repository';
import { ShortenUrl } from 'src/domain/shortenUrl/enterprise/shortenUrl';
import { FindShortenUrlByIdUseCase } from '../find-url-by-id';
import {  GetUrlByShortenUrlUseCase } from '../get-shroten-url';

describe('GetUrlByShortenUrlUseCase', () => {
  let useCase: GetUrlByShortenUrlUseCase;
  let repository: inMemoryShortenUrlRepository

  beforeEach(async () => {
    repository = new inMemoryShortenUrlRepository();
    useCase = new GetUrlByShortenUrlUseCase(repository);
    repository.items.push(ShortenUrl.create({
      originalUrl: "http://example.com",
      shortId: "abc123",
      id: "1"
    }))
  });
  it('should find a shortened URL by ID', async () => {
    const result = await useCase.execute({ shortenUrl: "abc123" });
    expect(result).toBeDefined();
    expect(result.originalUrl).toBe("http://example.com");
  });
});

