import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";

/**
 * Bootstraps the server.
 *
 * @return {Promise<void>} Nothing.
 */
async function bootstrap() {
	const app = await NestFactory.create( AppModule );
	app.useGlobalPipes( new ValidationPipe() );
	app.enableCors();
	await app.listen( 3000 );
}

bootstrap();
