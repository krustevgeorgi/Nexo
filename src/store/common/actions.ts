import {
    SET_CONNECTION,
    SET_PROVIDER,
    SET_SIGNER,
    SET_WALLET,
    SetConnectionAction,
    SetProviderAction,
    SetSignerAction,
    SetWalletAction
} from "./types";
import {Connection, Wallet} from "../../models";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers/src.ts/json-rpc-provider";

export const setConnection = (connection: Connection | null): SetConnectionAction => ({
    type: SET_CONNECTION,
    connection
});

export const setWallet = (wallet: Wallet | null): SetWalletAction => ({
    type: SET_WALLET,
    wallet
});

export const setProvider = (provider: JsonRpcProvider | null): SetProviderAction => ({
    type: SET_PROVIDER,
    provider
});

export const setSigner = (signer: JsonRpcSigner | null): SetSignerAction => ({
    type: SET_SIGNER,
    signer
});
