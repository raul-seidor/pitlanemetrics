import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/system";

const defaultImage = "images/user-avatar.png";

export default function DriverCard({
  img,
  nombre,
  equipo,
  colorEquipo,
  numero,
  onToggleFavourite,
  isFavourite,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={img ? img : defaultImage}
        alt={`${nombre}`}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div" textAlign={"left"}>
            {nombre}{" "}
            <span style={{ fontSize: "0.9rem", color: "#888" }}>#{numero}</span>
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
              backgroundColor: `#${colorEquipo}`,
              borderRadius: "50%",
              marginRight: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {equipo}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
