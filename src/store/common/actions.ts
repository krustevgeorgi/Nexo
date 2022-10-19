import {
    SET_LOADING,
    SET_CONNECTION,
    SET_SMALL_SCREEN,
    SetLoadingAction,
    SetConnectionAction,
    SetSmallScreenAction
} from "./types";
import {Connection} from "../../models";

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
