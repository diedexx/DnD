import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../../infrastructure/Base.resolver";
import Wallet from "./entities/Wallet.entity";

@Resolver( Wallet )
export class WalletResolver extends BaseResolver( Wallet, "wallet", "wallets" ) {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Wallet )
		private readonly walletRepository: Repository<Wallet>,
	) {
		super( walletRepository );
	}
}
