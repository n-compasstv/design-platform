import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useLazyGetContentsQuery } from "../../../app/services/api/endpoints/tier1/images";
import { useEffect } from "react";
import { blueGrey } from "@mui/material/colors";

const MediaList = () => {
  const [getContentsTrigger, getContentsResult] = useLazyGetContentsQuery();

  useEffect(() => {
    getContentsTrigger();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {(getContentsResult.isLoading
        ? Array.from(new Array(28))
        : getContentsResult.data
      )?.map((item) =>
        item ? (
          <Card key={item.contentId} sx={{ m: 1, maxHeight: 140, maxWidth: 140 }}>
            <CardActionArea>
              <CardMedia
                sx={{ height: 100, width: 140, backgroundSize: "contain" }}
                component="img"
                image={item.fileStackUrl}
                title={item.fileName}
              />
              <CardContent sx={{ p: 1, bgcolor: blueGrey[50] }}>
                <Typography noWrap>
                  <small>{item.fileName}</small>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : (
          <Skeleton
            sx={{ m: 1 }}
            variant="rectangular"
            width={140}
            height={140}
          />
        )
      )}
    </Grid>
  );
};

export default MediaList;
