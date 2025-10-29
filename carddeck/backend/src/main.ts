import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORRIGIR CORS - permitir todas as origens em desenvolvimento
  app.enableCors({
    origin: true, // ← Permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.listen(3333);
  console.log('🚀 Backend running on http://localhost:3333');
}
bootstrap();