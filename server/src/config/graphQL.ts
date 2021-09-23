import { ConfigObject, registerAs } from "@nestjs/config";
import { GqlModuleOptions } from "@nestjs/graphql/dist/interfaces/gql-module-options.interface";
import * as path from "path";

export interface GraphQLConfigInterface extends GqlModuleOptions, ConfigObject {
}

const sourceRoot = path.resolve( __dirname, ".." );

export default registerAs( "graphql", (): GraphQLConfigInterface => {
	return {
		autoSchemaFile: path.join( sourceRoot, "schema.sql" ),
		sortSchema: true,
	};
} );
