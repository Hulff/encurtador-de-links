import { inMemoryShortenUrlRepository } from 'test/repository/in-memory-shorten-url-repository';
import { ShortenUrl } from 'src/domain/shortenUrl/enterprise/shortenUrl';
import { FindShortenUrlByIdUseCase } from '../find-url-by-id';

describe('FindShortenUrlByIdUseCase', () => {
  let useCase: FindShortenUrlByIdUseCase;
  let repository: inMemoryShortenUrlRepository

  beforeEach(async () => {
    repository = new inMemoryShortenUrlRepository();
    useCase = new FindShortenUrlByIdUseCase(repository);
    repository.items.push(ShortenUrl.create({
      originalUrl: "http://example.com",
      shortId: "abc123",
      id: "1"
    }))
  });
  it('should find a shortened URL by ID', async () => {
    const result = await useCase.execute({ id: "1" });
    expect(result).toBeDefined();
    expect(result.getId()).toBe("1");
  });
});

