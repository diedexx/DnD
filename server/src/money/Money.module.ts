import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Wallet from "./entities/Wallet.entity";
import { WalletResolver } from "./Wallet.resolver";

@Module( {
	imports: [
		TypeOrmModule.forFeature( [
			Wallet,
		] ),
	],
	providers: [
		WalletResolver,
	],
} )
export class MoneyModule {
}
