import { ConfigObject, registerAs } from "@nestjs/config";
import * as path from "path";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export interface DatabaseConfigInterface extends MysqlConnectionOptions, ConfigObject {
}

const sourceRoot = path.resolve( __dirname, ".." );

export default registerAs( "database", (): DatabaseConfigInterface => {
	return {
		type: "mysql",
		host: "database",
		port: 3306,
		username: "dnd",
		password: "dnd",
		database: "dnd",
		cli: {
			migrationsDir: sourceRoot + "/migrations",
		},
		migrations: [ sourceRoot + "/migrations/**/*.{ts,js}" ],
		// Entities: [ sourceRoot + "/**/*.entity.{ts,js}" ],
	};
} );
