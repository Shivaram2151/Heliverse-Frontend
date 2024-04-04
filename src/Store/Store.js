import { thunk } from "redux-thunk";
import usersReducer from "./UserState/UserReducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import teamReducer from "./TeamState/TeamReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  teams: teamReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
