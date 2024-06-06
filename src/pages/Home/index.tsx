import { Box, Grid, Stack, Toolbar } from "@mui/material";
import { useGetTestQuery } from "../../app/services/api/endpoints/test";
import Canvas from "./Canvas";
import Layers from "./Layers";
import VerticalTabs from "./VerticalTabs";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks/useStore";

const Home = () => {
  const { data } = useGetTestQuery();
  const { layers } = useAppSelector((u) => u.layer);

  return (
    <Box height="calc(100vh - 64px)">
      <Toolbar />
      <Grid
        height="100%"
        alignItems="stretch"
        container
        spacing={0}
        columns={3}
        wrap="nowrap"
        justifyContent="space-between"
      >
        <Grid item>
          <VerticalTabs />
        </Grid>
        <Grid item sx={{ overflow: "auto" }} display="flex" alignItems="center">
          <Canvas elements={layers} />
        </Grid>
        <Grid item>
          <Layers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
