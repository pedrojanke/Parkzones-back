/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors(); // Isso permite que seu frontend se comunique com o backend

  await app.listen(process.env.PORT ||3000);
}
bootstrap();
