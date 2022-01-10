import { useState, useMemo } from "react";
import ButtonStyles from './styles/Button.module.css';
import AppStyles from './styles/App.module.css';


// Generate data outside of component to mimic consistent data coming from parent
const generateNumbers = (len, max) => Array.from({length: len}, () => Math.floor(Math.random() * max));
const data = generateNumbers(1000000, 100);

const UseMemoExample = () => {
  // State just for triggering revaluation, don't care what it is
  const [revaluate, setRevaluate] = useState();

  const revaluateHandler = () => {
    console.log("REVALUATE!");
    setRevaluate(prevState => !prevState);
  };

  const start = new Date().getTime(); 

  // const result = [...data].sort();

  const result = useMemo (() => {
    return [...data].sort()
  }, []);

  const end = new Date().getTime();
  const duration = end - start;

  return (
    <div className={AppStyles.Content}>
      <button className={ButtonStyles.Button} onClick={revaluateHandler}>Revaluate Component</button>
      <p>Length of data: {result.length}</p>
      <p>Data sorted in: {`${duration} ms`}</p>
    </div>
  )
};

export default UseMemoExample;