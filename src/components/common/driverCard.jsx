import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/system";

const defaultImage = "images/user-avatar.png";

/**
 * Component representing a driver card with their image, name, number, team, and team color.
 * Also allows marking a driver as a favorite with a star button.
 *
 * @prop {string} img - Driver's image.
 * @prop {string} name - Driver's name.
 * @prop {string} team - Team name.
 * @prop {string} teamColor - Team color in hexadecimal format.
 * @prop {number} number - Driver's number.
 * @prop {function} onToggleFavourite - Function called when the favorite button is clicked.
 * @prop {boolean} isFavourite - Whether the driver is a favorite or not.
 */
export default function DriverCard({
  img,
  name,
  team,
  teamColor,
  number,
  onToggleFavourite,
  isFavourite,
}) {
  return (
    <Card sx={{ maxWidth: { xs: "100%", md: 345 } }}>
      <CardMedia
        component="img"
        height="140"
        image={img ? img : defaultImage}
        alt={`${name}`}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"left"}
          >
            {name}{" "}
            <span style={{ fontSize: "0.9rem", color: "#888" }}>#{number}</span>
          </Typography>
          <IconButton
            onClick={onToggleFavourite}
            color={isFavourite ? "primary" : "default"}
          >
            <StarIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 15,
              height: 15,
              backgroundColor: `#${teamColor}`,
              borderRadius: "50%",
              marginRight: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {team}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
