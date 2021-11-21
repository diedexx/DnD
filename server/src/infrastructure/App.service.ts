import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	/**
	 * Gets hello.
	 *
	 * @return {string} Hello.
	 */
	getHello(): string {
		return "Hello Nest World!";
	}
}
