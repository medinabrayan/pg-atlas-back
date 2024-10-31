import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
  origin: (origin, callback) => {
    callback(null, true); // Permite cualquier dominio
  },
  methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  credentials: true,
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
