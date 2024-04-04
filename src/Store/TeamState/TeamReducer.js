import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  FETCH_TEAM_SUCCESS,
} from "./TeamActionType";

const initialState = {
  team: [],
  error: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        error: null,
      };

    case CREATE_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        error: null,
      };
    case FETCH_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;
