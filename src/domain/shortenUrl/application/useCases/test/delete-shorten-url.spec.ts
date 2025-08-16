import { inMemoryShortenUrlRepository } from 'test/repository/in-memory-shorten-url-repository';
import { DeleteShortenUrlUseCase } from '../delete-shorten-url';
import { ShortenUrl } from 'src/domain/shortenUrl/enterprise/shortenUrl';

describe('DeleteShortenUrlUseCase', () => {
  let useCase: DeleteShortenUrlUseCase;
  let repository: inMemoryShortenUrlRepository

  beforeEach(async () => {
    repository = new inMemoryShortenUrlRepository();
    useCase = new DeleteShortenUrlUseCase(repository);
    repository.items.push(ShortenUrl.create({
      originalUrl: "http://example.com",
      shortId: "abc123",
      id: "1"
    }))
  });
  it('should delete a shortened URL', async () => {
    const result = await useCase.execute({ id: "1" });
    expect(result).toBe("deletado com sucesso");
    expect(repository.items.length).toBe(0);
  });
});

