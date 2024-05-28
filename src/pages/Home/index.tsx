import { useLazyGetTestQuery } from "../../app/services/api/endpoints/test";

const Home = () => {
  const [trigger, { data, isError, error, isLoading, isFetching }] =
    useLazyGetTestQuery();
  const onClickBtn = async () => {
    await trigger();
  };
  return (
    <div>
      <h3>Home Page Here</h3>
      <button onClick={onClickBtn}>Call API</button>
      <div>API Result:</div>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {isError && error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default Home;
