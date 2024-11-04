import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as bodyParser from 'body-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Public Goods Atlas')
		.setDescription('Public Goods Atlas API description')
		.setVersion('1.0')
		.addTag('pgAtlas')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, documentFactory)

	app.enableCors({
		origin: (_origin: string, callback) => {
			callback(null, true) // Permite cualquier dominio
		},
		methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH',
		credentials: true,
		allowedHeaders: 'Content-Type, Accept, Authorization'
	})

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true, // Elimina propiedades que no estén en el DTO
		forbidNonWhitelisted: true, // Lanza un error si hay propiedades desconocidas
		transform: true, // Transforma los tipos de datos automáticamente
	  }));
	
	app.use(bodyParser.json({ limit: '10mb' }))
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

	await app.listen(process.env.PORT || 3000)
}
bootstrap()
