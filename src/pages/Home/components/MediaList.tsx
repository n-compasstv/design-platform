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
import { FC, useEffect, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { useAppSelector } from "../../../app/hooks/useStore";
import {
  KonvaElementType,
  KonvaImageType,
} from "../../../app/types/KonvaTypes";
import { getImageMetadata } from "../../../app/helpers/imageHelper";

type MediaListProps = {
  setSelectedMedia: (media: Array<KonvaImageType>) => void;
};

const MediaList: FC<MediaListProps> = ({ setSelectedMedia }) => {
  const [getContentsTrigger, getContentsResult] = useLazyGetContentsQuery();
  const [selectedLayers, setSelectedLayers] = useState<Array<KonvaElementType>>(
    []
  );

  const handleImageClick = async (imageUrl: string) => {
    const image = await getImageMetadata(imageUrl);
    const newLayers = [
      ...selectedLayers,
      {
        src: image.src,
        x: 80,
        y: 80,
        width: image.width,
        height: image.height,
      },
    ];
    setSelectedLayers(newLayers);
  };

  useEffect(() => {
    setSelectedMedia(selectedLayers);
  }, [selectedLayers]);

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
          <Card
            key={item.contentId}
            sx={{ m: 1, maxHeight: 140, maxWidth: 140 }}
          >
            <CardActionArea onClick={() => handleImageClick(item.fileStackUrl)}>
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
