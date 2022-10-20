import {BigNumber} from "ethers";

export interface Connection {
    address: string;
    network: string;
    ethBalance: BigNumber;
    wethBalance: BigNumber;
    nexoBalance: BigNumber;
}