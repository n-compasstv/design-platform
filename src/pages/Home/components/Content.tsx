import { Grid } from "@mui/material";
import Canvas from "./Canvas";
import { useState } from "react";
import { KonvaImageType } from "../../../app/types/KonvaImageType";
import VerticalTabs from "./VerticalTabs";
import Layers from "./Layers";

const HomeContent = () => {
  const [elements, setElements] = useState<KonvaImageType | any>([]);
  return (
    <Grid
      alignItems="stretch"
      container
      spacing={1}
      columns={3}
      wrap="nowrap"
      sx={{ overflow: "auto" }}
    >
      <Grid item>
        <VerticalTabs />
      </Grid>
      <Grid item>
        <Canvas elements={elements} />
      </Grid>
      <Grid item>
        <Layers />
      </Grid>
    </Grid>
  );
};

export default HomeContent;
