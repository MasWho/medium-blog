// Global imports

// Local imports
import { useEpicTableStore } from "../store/store";
import { testAction } from "../store/actions";

const Table: React.FC<{}> = () => {
  const {globalState, dispatch} = useEpicTableStore();

  const clickHandler = () => {
    dispatch(testAction({data: 'Nooooooo'}));
  };

  return <div onClick={clickHandler}>
    {globalState.data.map((x: any, i: number) => <div key={i}>{x.col1}</div>)}
  </div>
};

export default Table;