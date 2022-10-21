import {
    CommonActions,
    CommonState,
    SET_CONNECTION,
    SET_WALLET,
    SET_PROVIDER,
    SET_SIGNER,
    SET_SMALL_SCREEN
} from "./types";
import {Reducer} from "redux";

const smallScreenQuery = window.matchMedia('(max-width: 576px)');

const initialCommonState: CommonState = {
    smallScreen: smallScreenQuery.matches,
    connection: null,
    wallet: null,
    provider: null,
    signer: null
};

export const commonReducer: Reducer<CommonState, CommonActions> = (state = initialCommonState, action) => {
    switch (action.type) {
        case SET_SMALL_SCREEN:
            return {...state, smallScreen: action.smallScreen};
        case SET_CONNECTION:
            return {...state, connection: action.connection};
        case SET_WALLET:
            return {...state, wallet: action.wallet};
        case SET_PROVIDER:
            return {...state, provider: action.provider};
        case SET_SIGNER:
            return {...state, signer: action.signer};
        default:
            neverReached(action);
    }
    return state;
};

// tslint:disable-next-line:no-empty
const neverReached = (never: never) => {
};