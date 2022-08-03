// Global imports

// Local imports
import { useEpicTableStore } from "../store/store";
import { testAction } from "../store/actions";

const Table: React.FC<{}> = () => {
  const [globalState, dispatch] = useEpicTableStore();

  const clickHandler = () => {
    dispatch(testAction({data: 'Nooooooo'}));
  };

  return <div onClick={clickHandler}>
    {globalState.test1}
    {globalState.test2}
    {globalState.test3}
  </div>
};

export default Table;