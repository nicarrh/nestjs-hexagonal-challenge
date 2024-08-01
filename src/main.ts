import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const prefix = 'challenge-ms/v1';
  app.setGlobalPrefix(prefix);
  await app.listen(3000);
}
bootstrap();
