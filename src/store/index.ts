import { commonReducer } from "./common/reducers";
import { CommonState } from "./common/types";
import { combineReducers } from "redux";

export interface State {
  common: CommonState;
}

export const rootReducer = combineReducers<State>({
  common: commonReducer,
});

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => State): void;
}