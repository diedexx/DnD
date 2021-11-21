import { ConfigObject, registerAs } from "@nestjs/config";
import * as path from "path";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export interface DatabaseConfigInterface extends MysqlConnectionOptions, ConfigObject {
}

const sourceRoot = path.resolve( __dirname, "..", ".." );

export default registerAs( "database", (): DatabaseConfigInterface => {
	return {
		type: "mysql",
		host: process.env.DB_HOST || "127.0.0.1",
		port: parseInt( process.env.DB_PORT, 10 ) || 3306,
		username: "dnd",
		password: "dnd",
		database: "dnd",
		cli: {
			migrationsDir: sourceRoot + "/infrastructure/migrations",
		},
		migrations: [ sourceRoot + "/infrastructure/migrations/**/*.{ts,js}" ],
		entities: [ sourceRoot + "/**/*.entity.{ts,js}" ],
	};
} );
