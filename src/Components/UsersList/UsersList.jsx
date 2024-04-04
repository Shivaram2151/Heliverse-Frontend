import React, { useEffect, useState } from "react";
import { UsersCard } from "../UsersCard/UsersCard";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Store/UserState/UsersAction";
import { Pagination } from "../Pagination/Pagination";
import { Button } from "@mui/joy";
import { createTeam } from "../../Store/TeamState/TeamAction";
import { useLocation, useNavigate } from "react-router";

export const UsersList = () => {
  const { users } = useSelector((store) => store.users);
  const [userData, setUserData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTermName, setSearchTermName] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [domainsOptions, setDomainsOptions] = useState([]);
  const [gendersOptions, setGendersOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [teamName, setTeamName] = useState("-");
  const [teamData, setTeamData] = useState([]);
  const [pendingUser, setPendingUser] = useState("");

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toggleOpen = () => {
    setIsSubmit(true);
  };
  const toggleClose = () => {
    setIsSubmit(false);
  };
  const limit = 20;
  useEffect(() => {
    dispatch(
      fetchUsers({
        currentPage: currentPage,
        limit: limit,
      })
    );
    toast.success("Successfully Fetched Users.");
  }, [currentPage]);
  useEffect(() => {
    setUserData(users);
    setFilteredUsers(users);
    const uniqueDomains = [...new Set(users.map((user) => user.domain))];
    setDomainsOptions(uniqueDomains);
    const uniqueGender = [...new Set(users.map((user) => user.gender))];
    setGendersOptions(uniqueGender);
  }, [users]);

  const handleSearchName = (term) => {
    if (searchTermName === "") {
      setFilteredUsers(userData);
    } else {
      const updatedUsers = userData.filter((user) =>
        (user.first_name + " " + user.last_name)
          .toLowerCase()
          .includes(searchTermName.toLowerCase())
      );
      setFilteredUsers(updatedUsers);
    }
  };

  const handleDomainChange = (e) => {
    setDomainFilter(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handleAvailableChange = (e) => {
    setAvailabilityFilter(e.target.value);
    console.log(e.target.value, "93");
  };

  useEffect(() => {
    if (genderFilter) {
      const updatedUsers = userData.filter(
        (user) => user.gender.toLowerCase() === genderFilter.toLowerCase()
      );
      setFilteredUsers(updatedUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [genderFilter, users]);

  useEffect(() => {
    // if (availabilityFilter) {
    //   const updatedUsers = userData.filter((user) =>
    //     user.available ? true : false
    //   );
    //   console.log();
    //   setFilteredUsers(updatedUsers);
    // } else {
    //   setFilteredUsers(users);
    // }

    if (availabilityFilter === "") {
      setFilteredUsers(users);
    } else {
      const updatedUsers = userData.filter(
        (user) =>
          user.available === (availabilityFilter === "true" ? true : false)
      );
      setFilteredUsers(updatedUsers);
    }
  }, [availabilityFilter, users]);
  useEffect(() => {
    if (domainFilter) {
      const updatedUsers = userData.filter((user) =>
        user.domain.toLowerCase().includes(domainFilter.toLowerCase())
      );
      setFilteredUsers(updatedUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [domainFilter, users]);
  console.log(selectedUsers, "selectedusers");
  const handleUserSelect = (userId) => {
    const user = filteredUsers.find((user) => user.id === userId);

    const isSelected = selectedUsers.some(
      (selectedUser) => selectedUser.id === userId
    );

    const isUnique = !selectedUsers.some(
      (selectedUser) =>
        selectedUser.domain === user.domain &&
        selectedUser.available === user.available
    );

    const isAvailable = user.available === "yes" || user.available === true;

    console.log(teamData, isAvailable, selectedUsers, "alldata");
    if (teamData.length === 0 && isAvailable && selectedUsers.length === 0) {
      toast.error("Please create a team before adding users.");

      if (selectedUsers.length === 0) {
        handleClickOpen();
        setPendingUser(user);
      }
      return;
    }

    if (isAvailable) {
      if (selectedUsers.length === 4 && !isSelected) {
        toast.error("You have reached the limit of 4 selected users.");
      } else {
        if (!isSelected && isUnique) {
          setSelectedUsers([...selectedUsers, user]);
          toast.success("Successfully Selected User.");
        } else if (isSelected) {
          setSelectedUsers(
            selectedUsers.filter((selectedUser) => selectedUser.id !== userId)
          );
        } else {
          toast.error("User with the same domain is already selected!");
        }
      }
    } else {
      toast.error("User is not available.");
    }
  };
  console.log("toggle", isSubmit);
  console.log("team data", teamData);
  const handleCreateTeam = async () => {
    if (selectedUsers.length < 4) {
      toast.error("Please select at least 4 users to create a team.");
    } else {
      const teamData1 = { name: teamName, users: selectedUsers };
      console.log("teamdata", teamData1);
      try {
        const response = await dispatch(createTeam(teamData1));
        console.log(response);
        setTeamData(response);
        navigate("/teams", {
          state: { teamData: response.data, teamName: teamName },
        });
        toast.success("Team created successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUserPending = () => {
    setSelectedUsers([...selectedUsers, pendingUser]);
    setPendingUser("");
    toast.success("Successfully Selected User.");
  };

  console.log(selectedUsers, "selectedusers");
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          alignSelf={"center"}
          className="users-container"
        >
          <h1>Users</h1>
        </Grid>
        <Grid item xs={12} md={12} lg={12} className="mb-4">
          <Grid item justifySelf={"end"}>
            <span className="users-container">
              Team Members: {selectedUsers.length}
            </span>
          </Grid>
          <Button variant="solid" onClick={handleCreateTeam}>
            CreateTeam
          </Button>
        </Grid>
        <Grid container alignItems={"flex-start"}>
          <Grid item xs={9} md={11} lg={10} className="mb-4">
            <TextField
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              defaultValue="Small"
              size="small"
              onChange={(e) => setSearchTermName(e.target.value)}
              value={searchTermName}
              placeholder="Enter text here"
              style={{ width: "90%" }}
            />
          </Grid>
          <Grid item md={1} xs={3} lg={2}>
            <Button variant="solid" onClick={handleSearchName}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <label htmlFor="domain">Select Domain:</label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              id="domain"
              onChange={handleDomainChange}
              style={{ width: "100%" }}
            >
              <option value="">All Domains</option>
              {domainsOptions.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <label htmlFor="gender">Select Gender:</label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              id="gender"
              onChange={handleGenderChange}
              style={{ width: "100%" }}
            >
              <option value="">All Genders</option>
              {gendersOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <label htmlFor="gender">Select Availability:</label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              id="gender"
              onChange={handleAvailableChange}
              style={{ width: "100%" }}
            >
              <option value="">All Available</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredUsers?.map((user, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              <UsersCard
                user={user}
                handleUserSelect={handleUserSelect}
                selectedUsers={selectedUsers}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} alignSelf={"center"}>
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={20}
            />
          </Grid>
        </Grid>
        <ToastContainer />
      </Grid>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const name = formJson.Name;
              console.log(name, "name1");
              handleClose();
              handleUserPending();
            },
          }}
        >
          <DialogTitle>Team</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Name"
              label="Enter Team Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
