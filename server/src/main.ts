import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Bootstraps the server.
 *
 * @return {Promise<void>} Nothing.
 */
async function bootstrap() {
	const app = await NestFactory.create( AppModule );
	app.useGlobalPipes( new ValidationPipe() );

	await app.listen( 3000 );
}

bootstrap();
