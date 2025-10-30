import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!');
    });

    it('should always return the same message', () => {
      const result1 = service.getHello();
      const result2 = service.getHello();
      const result3 = service.getHello();

      expect(result1).toBe('Hello World!');
      expect(result2).toBe('Hello World!');
      expect(result3).toBe('Hello World!');
    });

    it('should return string type', () => {
      const result = service.getHello();
      
      expect(typeof result).toBe('string');
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });
  });
});