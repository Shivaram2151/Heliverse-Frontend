import axios from "axios";
import {
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
} from "./TeamActionType";

export const createTeam = (teamData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TEAM_REQUEST });
    try {
      const response = await axios.post(
        "https://heliverse-6cjp.onrender.com/api/teams/registerTeam",
        teamData
      );
      console.log("Team created", response);
      dispatch({ type: CREATE_TEAM_SUCCESS, payload: response });
      return response;
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_TEAM_FAILURE, payload: error.message });
    }
  };
};

export const fetchTeamById = (teamId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TEAM_REQUEST });
    try {
      const response = await axios.get(
        `https://heliverse-6cjp.onrender.com/api/teams/${teamId}`
      );
      console.log("Fetching team", response);
      dispatch({ type: FETCH_TEAM_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: FETCH_TEAM_FAILURE, payload: error });
    }
  };
};
