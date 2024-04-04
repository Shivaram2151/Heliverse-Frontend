import axios from "axios";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "./UsersActionTypes";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUsers = ({ currentPage, limit }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
      const response = await axios.get(
        `https://heliverse-6cjp.onrender.com/api/users/getUsers?page=${currentPage}&limit=${limit}`
      );
      console.log("all users", response.data);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
      console.log("Fetching users failed", error);
    }
  };
};

export const fetchUserByUserId = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
      const response = await axios.get(
        `https://heliverse-6cjp.onrender.com/api/users/${userId}`
      );
      console.log("user by id", response.data);
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
      console.log("Fetching user failed");
    }
  };
};

export const fetchUserById = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
      const response = await axios.get(
        `https://heliverse-6cjp.onrender.com/api/users/getUser/${id}`
      );
      console.log("user by id", response.data);
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
      console.log(error);
    }
  };
};
