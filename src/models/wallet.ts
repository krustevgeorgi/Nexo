import {BigNumber} from "ethers";

export interface Wallet {
    address: string;
    ethBalance: BigNumber;
    wethBalance: BigNumber;
    nexoBalance: BigNumber;
    uniBalance: BigNumber;
}