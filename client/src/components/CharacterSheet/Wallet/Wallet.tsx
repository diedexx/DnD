import { FunctionComponent } from "react";
import WalletInterface from "../../../interfaces/Wallet.interface";
import "./Wallet.css";

export type WalletProps = {
	wallet: WalletInterface
}

/**
 * Gets the value of a coin.
 *
 * @param {string} label The label to display.
 * @param {number} value The number of coins in possession.
 * @param {string} className The class of the type of coin.
 *
 * @return {JSX.Element} The element.
 */
const getCoin = ( label: string, value: number, className: string ): JSX.Element => {
	return <div className={ "wallet__coin " + className }>
		<div className="wallet__coin-label">{ label }</div>
		<div className="wallet__coin-value">{ value }</div>
	</div>;
};

/**
 * Displays the wallet contents.
 *
 * @param {WalletInterface} wallet The wallet to display the contents for.
 *
 * @return {JSX.Element} The wallet.
 */
const Wallet: FunctionComponent<WalletProps> = ( { wallet }: WalletProps ): JSX.Element => {
	return <div className="wallet">
		{ getCoin( "CP", wallet.copper, "copper" ) }
		{ getCoin( "SP", wallet.silver, "silver" ) }
		{ getCoin( "EP", wallet.electrum, "electrum" ) }
		{ getCoin( "GP", wallet.gold, "gold" ) }
		{ getCoin( "PP", wallet.platinum, "platinum" ) }
	</div>;
};

export default Wallet;
