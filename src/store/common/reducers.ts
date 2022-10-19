import {
    CommonActions,
    CommonState,
    SET_CONNECTION,
    SET_LOADING,
    SET_SMALL_SCREEN,
} from "./types";
import {Reducer} from "redux";

const smallScreenQuery = window.matchMedia('(max-width: 576px)');

const initialCommonState: CommonState = {
    isLoading: false,
    smallScreen: smallScreenQuery.matches,
    connection: null,
};

export const commonReducer: Reducer<CommonState, CommonActions> = (state = initialCommonState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_SMALL_SCREEN:
            return {...state, smallScreen: action.smallScreen};
        case SET_CONNECTION:
            return {...state, connection: action.connection};
        default:
            neverReached(action);
    }
    return state;
};

// tslint:disable-next-line:no-empty
const neverReached = (never: never) => {
};