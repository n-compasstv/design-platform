import { useLazyGetTestQuery } from "../../app/services/api/endpoints/test";

const Home = () => {
  const [trigger, {data, isLoading, isFetching}] = useLazyGetTestQuery();
  const onClickBtn = async () => {
    await trigger();
  };
  return (
    <div>
      <h3>Home Page Here</h3>
      <button onClick={onClickBtn}>Call API</button>
    </div>
  );
};

export default Home;
