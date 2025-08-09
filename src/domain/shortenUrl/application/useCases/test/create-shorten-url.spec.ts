import { inMemoryShortenUrlRepository } from 'test/repository/in-memory-shorten-url-repository';
import { CreateShortenUrlUseCase } from '../create-shorten-url';

describe('CreateShortenUrlUseCase', () => {
  let useCase: CreateShortenUrlUseCase;
  let repository: inMemoryShortenUrlRepository

  beforeEach(async () => {
    repository = new inMemoryShortenUrlRepository();
    useCase = new CreateShortenUrlUseCase(repository);
  });
  it('should create a shortened URL', async () => {
    const result = await useCase.execute({ originalUrl: 'http://example.com' });
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('shortId');
    expect(result.getOriginalUrl()).toBe("http://example.com");
  });
});
