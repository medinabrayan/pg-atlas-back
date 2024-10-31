import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://rapid-limit-5419.on.fleek.co/'], // Cambia esto a la URL de tu frontend
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
    credentials: true, // Permite el envío de cookies si es necesario
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  const config = new DocumentBuilder()
  .setTitle('Public Goods Atlas')
  .setDescription('Public Goods Atlas API description')
  .setVersion('1.0')
  .addTag('pga')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
