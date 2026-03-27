import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation globally enable 
  app.useGlobalPipes(new ValidationPipe())
  
  // Frontend request allowed
  app.enableCors({
    origin: process.env.FRONTEND_URL!
  })
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend Running ${process.env.PORT}`);
  

}
bootstrap();
