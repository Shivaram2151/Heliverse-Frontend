import { Grid, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { fetchUserById } from "../../Store/UserState/UsersAction";
import CArdUSer from "./CArdUSer";
import { ToastContainer, toast } from "react-toastify";
export const Team = () => {
  const location = useLocation();
  const teamData = location.state?.teamData || null;

  const teamName = location.state?.teamName || null;
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (teamData && teamData.users) {
        try {
          const promises = teamData.users.map((userId) =>
            dispatch(fetchUserById(userId))
          );
          const userDataArray = await Promise.all(promises);
          setUserData(userDataArray);
          console.log(userDataArray);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
    toast.success("Welcome to new team!");
  }, [teamData, dispatch]);
  console.log(userData);
  return (
    <div className="Team">
      <div>
        <h1 className="TeamD">Team Details</h1>
        <h1 className="TeamName">Team Name: {teamName}</h1>
      </div>
      <Grid container>
        {userData?.map((user) => (
          <Grid key={user} item xs={12} sm={6} md={4} lg={3}>
            <CArdUSer user={user} />
          </Grid>
        ))}
      </Grid>

      <ToastContainer />
    </div>
  );
};
