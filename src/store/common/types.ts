import {Action} from "redux";
import {Connection, Wallet} from "../../models";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers/src.ts/json-rpc-provider";

export interface CommonState {
    readonly connection: Connection | null;
    readonly wallet: Wallet | null;
    readonly provider: JsonRpcProvider | null;
    readonly signer: JsonRpcSigner | null;
}

export const SET_CONNECTION = "SET_CONNECTION";
export const SET_WALLET = "SET_WALLET";
export const SET_PROVIDER = "SET_PROVIDER";
export const SET_SIGNER = "SET_SIGNER";

export interface SetConnectionAction extends Action<typeof SET_CONNECTION> {
    connection: Connection | null;
}

export interface SetWalletAction extends Action<typeof SET_WALLET> {
    wallet: Wallet | null;
}

export interface SetProviderAction extends Action<typeof SET_PROVIDER> {
    provider: JsonRpcProvider | null;
}

export interface SetSignerAction extends Action<typeof SET_SIGNER> {
    signer: JsonRpcSigner | null;
}


export type CommonActions =
    | SetConnectionAction
    | SetWalletAction
    | SetProviderAction
    | SetSignerAction