import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Chip,
  Typography,
} from "@mui/joy";
import React from "react";

export const UsersCard = ({ user, handleUserSelect, selectedUsers }) => {
  const isTeam = selectedUsers.find((i) => i.id === user.id);
  return (
    <Card
      sx={{
        width: 300,
        maxWidth: "100%",
        boxShadow: "lg",
        marginTop: "14px",
        marginLeft: "10px",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={user?.avatar} sx={{ "--Avatar-size": "4rem" }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        ></Chip>
        <Typography level="title-lg">
          Name : {user?.first_name} {user?.last_name}
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "37ch" }}>
          Email: {user?.email}
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "37ch" }}>
          Available: {user?.available ? "yes" : "no"}
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "37ch" }}>
          Domain: {user?.domain}
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "37ch" }}>
          Gender: {user?.gender}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            "& > button": { borderRadius: "2rem" },
          }}
        ></Box>
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions buttonFlex="1">
          <ButtonGroup
            variant="outlined"
            sx={{ bgcolor: "background.surface" }}
          >
            <Button onClick={() => handleUserSelect(user.id)}>
              {!isTeam ? "Team" : "Remove from Team"}
            </Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
