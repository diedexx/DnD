import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	/**
	 * The constructor.
	 *
	 * @param {AppService} appService The appServ.ce
	 */
	constructor( private readonly appService: AppService ) {
	}

	/**
	 * Gets hello.
	 *
	 * @return {string} Hello.
	 */
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
