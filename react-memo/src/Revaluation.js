/**
 * NOTE:
 * 1. A react component function is revaluated everytime a state, prop or context change is registered.
 * 2. The component function as well as all of its children will be revaluated.
 * 3. Revaluating react component functions is not the same thing as real DOM manipulation
 * 4. For large react apps, with deeply nested component trees, it is wasteful to always revaluate all children of a component
 * 5. If a child component is conditionally skipped then it will not be revaluated
 */

import { useState } from "react";
import ButtonStyles from '../styles/Button.module.css';
import AppStyles from '../styles/App.module.css';

// Child component that will render based on show prop
const Child1 = ({show}) => {
  console.log('Child1 RUNNING');
  return (
    <>
      {show && <p>This is new!</p>}
      <Child2 />
    </>
  );
};


const Child2 = () => {
  console.log('Child2 RUNNING');
  return "";
};


const Child3 = () => {
  console.log('Child3 RUNNING');
  return "";
};


const Child4 = () => {
  console.log('Child4 RUNNING');
  return "";
};


const Revaluation = () => {
  const [show, setShow] = useState(false);

  const toggleHandler = () => {
    setShow(!show);
  };

  // This should log everytime the toggle button is clicked
  console.log('APP RUNNING');

  return (
    <div className={AppStyles.Content}>
      <h1>Hello!</h1>
      {/* Child1 will be revaluated regardless of show, as well as Child2 */}
      <Child1 show={false} />
      {/* Child3 will not be revaluated */}
      {false && <Child3 />}
      {/* Child4 will be revaluated */}
      <Child4 />
      <button className={ButtonStyles.Button} onClick={toggleHandler}>Toggle this!</button>
    </div>
  );
};

export default Revaluation;