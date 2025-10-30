import { cardsApi } from '../../../src/lib/api';

global.fetch = jest.fn();

describe('cardsApi', () => {
  const mockResponse = (data: any, ok = true) => ({
    ok,
    json: async () => data,
  });

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should get all cards', async () => {
    const mockCards = [{ id: '1', holderName: 'Test Card' }];
    (fetch as jest.Mock).mockResolvedValue(mockResponse(mockCards));

    const result = await cardsApi.getAll();

    expect(fetch).toHaveBeenCalled();
    expect(result).toEqual(mockCards);
  });
});