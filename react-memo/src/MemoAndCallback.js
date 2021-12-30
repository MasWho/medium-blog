import React, { useState, useCallback } from "react";
import ButtonStyles from './styles/Button.module.css';
import AppStyles from './styles/App.module.css';


const Child1 = React.memo(({ show }) => {
  console.log("Child1 RUNNING");
  return show && <p>This is new!</p>;
});


const Child2 = React.memo(({ func }) => {
  func();
  return "";
});


const Child3 = React.memo(({ func }) => {
  func();
  return "";
});


const MemoAndCallback = () => {
  const [show, setShow] = useState(false);

  const toggleHandler = () => {
    setShow(!show);
  };

  const child2Func = () => {
    console.log('Child2 RUNNING');
  };
  
  // Memoized handler function for child 3
  const child3Func = useCallback(() => {
    console.log('Child3 RUNNING');
  }, []);  // No external dependencies therefore empty array is fine

  // This should log everytime the toggle button is clicked
  console.log("APP RUNNING");

  return (
    <div className={AppStyles.Content}>
      <h1>Hello!</h1>
      {/* Only revaluate Child1 if show changed */}
      <Child1 show={false} />
      {/* Functions being a non-primitive data type will cause Child2 to revaluate even if wrapped in React.memo */}
      <Child2 func={child2Func} />
      <Child3 func={child3Func} />
      <button className={ButtonStyles.Button} onClick={toggleHandler}>Toggle this!</button>
    </div>
  );
};

export default MemoAndCallback;
