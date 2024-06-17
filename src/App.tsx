import { Box } from "@mui/material";
import "./App.scss";
import DenseAppBar from "./common/components/DenseAppBar";
import Routing from "./pages/Routing";

const App = () => {
  return (
    <Box>
      <DenseAppBar />
      <Routing />
    </Box>
  );
};

export default App;
