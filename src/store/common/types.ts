import {Action} from "redux";
import {Connection} from "../../models";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers/src.ts/json-rpc-provider";

export interface CommonState {
    readonly isLoading: boolean;
    readonly smallScreen: boolean;
    readonly connection: Connection | null;
    readonly provider: JsonRpcProvider | null;
    readonly signer: JsonRpcSigner | null;
}

export const SET_LOADING = "SET_LOADING";
export const SET_SMALL_SCREEN = "SET_SMALL_SCREEN";
export const SET_CONNECTION = "SET_CONNECTION";
export const SET_PROVIDER = "SET_PROVIDER";
export const SET_SIGNER = "SET_SIGNER";

export interface SetLoadingAction extends Action<typeof SET_LOADING> {
    isLoading: boolean;
}

export interface SetSmallScreenAction extends Action<typeof SET_SMALL_SCREEN> {
    smallScreen: boolean;
}

export interface SetConnectionAction extends Action<typeof SET_CONNECTION> {
    connection: Connection;
}

export interface SetProviderAction extends Action<typeof SET_PROVIDER> {
    provider: JsonRpcProvider | null;
}

export interface SetSignerAction extends Action<typeof SET_SIGNER> {
    signer: JsonRpcSigner | null;
}

export type CommonActions =
    | SetLoadingAction
    | SetSmallScreenAction
    | SetConnectionAction
    | SetProviderAction
    | SetSignerAction