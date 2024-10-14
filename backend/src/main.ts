import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Cho phép miền này truy cập
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được cho phép
    credentials: true, // Cho phép gửi cookie trong các yêu cầu
  });
  
  await app.listen(3000);
}
bootstrap();
