import {
    SET_CONNECTION,
    SET_LOADING,
    SET_PROVIDER,
    SET_SIGNER,
    SET_SMALL_SCREEN,
    SetConnectionAction,
    SetLoadingAction,
    SetProviderAction,
    SetSignerAction,
    SetSmallScreenAction
} from "./types";
import {Connection} from "../../models";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers/src.ts/json-rpc-provider";

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
    type: SET_LOADING,
    isLoading
});

export const setSmallScreen = (smallScreen: boolean): SetSmallScreenAction => ({
    type: SET_SMALL_SCREEN,
    smallScreen
});

export const setConnection = (connection: Connection): SetConnectionAction => ({
    type: SET_CONNECTION,
    connection
});

export const setProvider = (provider: JsonRpcProvider): SetProviderAction => ({
    type: SET_PROVIDER,
    provider
});

export const setSigner = (signer: JsonRpcSigner): SetSignerAction => ({
    type: SET_SIGNER,
    signer
});
