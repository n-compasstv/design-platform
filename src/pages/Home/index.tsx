import { Box, Grid, Stack, Toolbar } from "@mui/material";
import Canvas from "./components/Canvas";
import Layers from "./components/Layers";
import VerticalTabs from "./components/VerticalTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetNewsTemplateByIdQuery } from "../../app/services/api/endpoints/newsTemplate";
import { useAppDispatch } from "../../app/hooks/useStore";
import { setNewsTemplate } from "../../app/slices/newsTemplateSlice";
import { NewsTemplateType } from "../../app/types/NewsTemplateTypes";
import { setLayers } from "../../app/slices/layerSlice";
import { KonvaElementType } from "../../app/types/KonvaTypes";

const Home = () => {
  const dispatch = useAppDispatch();
  const { newstemplateid } = useParams();
  const navigate = useNavigate();
  const [getNewsTemplateByIdTrigger] = useLazyGetNewsTemplateByIdQuery();

  useEffect(() => {
    if (newstemplateid) {
      getNewsTemplateByIdTrigger(newstemplateid).then((response) => {
        if (response.isSuccess) {
          const data: NewsTemplateType = response.data;
          dispatch(setNewsTemplate(data));

          if(data.newsObject) {
            dispatch(setLayers(JSON.parse(data.newsObject)))
          }
        }
        else {
          navigate("/page-not-found")
        }
      });
    } else {
      navigate("/page-not-found")
    }
  }, [newstemplateid]);
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
          <Canvas />
        </Grid>
        <Grid item>
          <Layers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
