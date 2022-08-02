import { useEpicTableStore, GlobalState } from "../store/EpicTableStoreProvider";

const Table: React.FC<{}> = () => {
  const [globalState, setGlobalState] = useEpicTableStore();

  const clickHandler = () => {
    setGlobalState!((prevState: GlobalState) => {
      return {
        ...prevState,
        test2: 1000
      };
    });
  }

  return <div onClick={clickHandler}>
    {globalState.test1}
    {globalState.test2}
    {globalState.test3}
  </div>
};

export default Table;