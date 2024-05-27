import { useEffect } from "react";
import "./App.css";
import Routing from "./pages/Routing";
import { setLogonUser } from "./app/slices/userSlice";
import { UserModel } from "./app/types/UserModel";
import { useAppDispatch } from "./app/hooks/useStore";

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("App Render")
    const user: UserModel = {
      id: crypto.randomUUID().toString(),
      username: "test@gmail.com"
    };
    dispatch(setLogonUser(user));
  }, []);

  return <Routing />;
}

export default App;
