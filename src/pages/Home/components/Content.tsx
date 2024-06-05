import { Box, Grid } from "@mui/material";
import Canvas from "./Canvas";
import { useState } from "react";
import { KonvaImageType } from "../../../app/types/KonvaImageType";
import VerticalTabs from "./VerticalTabs";
import Layers from "./Layers";

const HomeContent = () => {
  const [elements, setElements] = useState<KonvaImageType | any>([]);
  return (
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
        <Canvas elements={elements} />
      </Grid>
      <Grid item>
        <Layers />
      </Grid>
    </Grid>
  );
};

export default HomeContent;
