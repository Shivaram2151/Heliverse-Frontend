import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
} from "./TeamActionType";

const initialState = {
  team: [],
  error: null,
  loading: false,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        error: null,
        loading: false,
      };

    case CREATE_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_TEAM_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        error: null,
        loading: false,
      };
    case FETCH_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_TEAM_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default teamReducer;
