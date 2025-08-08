import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://smart-commerce-prueba-tecnica-production-9689.up.railway.app/',
      /https:\/\/.*\.vercel\.app$/,
    ],
    credentials: true,
  });

  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0'); // ← Este es el cambio importante
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();