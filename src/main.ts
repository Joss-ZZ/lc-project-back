import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { ApiEndpoint, getPathController } from './config/endpoint';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const nestApp = await NestFactory.create(AppModule);
	nestApp.enableCors();

	// Swagger setup
	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle(swaggerConfig.title)
		.setDescription(swaggerConfig.description)
		.setVersion(swaggerConfig.version);

	Object.values(ApiEndpoint).forEach((tag) => {
		if (tag !== 'swagger') config.addTag(tag);
	});

	const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.7.2';

	const document = SwaggerModule.createDocument(nestApp, config.build());
	SwaggerModule.setup(getPathController(ApiEndpoint.SWAGGER), nestApp, document, {
		customCssUrl: `${swaggerCDN}/swagger-ui.css`,
		customJs: [
			`${swaggerCDN}/swagger-ui-bundle.js`,
			`${swaggerCDN}/swagger-ui-standalone-preset.js`,
		],
	});

  // Validators
	nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await nestApp.listen(process.env.PORT || 3000);
}

bootstrap();