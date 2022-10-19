import {Action} from "redux";
import {Connection} from "../../models";

export interface CommonState {
    readonly isLoading: boolean;
    readonly smallScreen: boolean;
    readonly connection: Connection | null;
}

export const SET_LOADING = "SET_LOADING";
export const SET_SMALL_SCREEN = "SET_SMALL_SCREEN";
export const SET_CONNECTION = "SET_CONNECTION";

export interface SetLoadingAction extends Action<typeof SET_LOADING> {
    isLoading: boolean;
}

export interface SetSmallScreenAction extends Action<typeof SET_SMALL_SCREEN> {
    smallScreen: boolean;
}

export interface SetConnectionAction extends Action<typeof SET_CONNECTION> {
    connection: Connection;
}

export type CommonActions =
    | SetLoadingAction
    | SetSmallScreenAction
    | SetConnectionAction