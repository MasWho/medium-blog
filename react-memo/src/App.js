/**
 * NOTE:
 * 1. Try use css module
 * 2. Things in App should be sectioned input HOCs
 */

import AppStyles from './styles/App.module.css';
import ButtonStyles from './styles/Button.module.css';
import Revaluation from './Revaluation';
import MemoAndCallback from './MemoAndCallback';
import UseMemo from './UseMemo';
import React, {useState} from 'react';


const Tabs = ({onClickTab, tabs, selectedTab}) => {
    tabs = tabs.map((topic, idx) => {
      return <button 
        className={ButtonStyles.Button} 
        key={idx} 
        onClick={onClickTab.bind(null, topic)}
        style={{backgroundColor: selectedTab === topic ? "rgb(82,201,199)": "white"}}
      >
        {topic}
      </button>
    });

  return (
    <div className={AppStyles.Tabs}>
      {tabs}
    </div>
  );
};


const App = () => {
  const [tab, setTab] = useState('revaluation');

  const clickTabHandler = (topic) => {
    setTab(topic);
  };

  return (
    <div className={AppStyles.App}>
      <Tabs onClickTab={clickTabHandler} tabs={['revaluation', 'memo-and-callback', 'use-memo']} selectedTab={tab} />
      {tab === 'revaluation' && <Revaluation />}
      {tab === 'memo-and-callback' && <MemoAndCallback />}
      {tab === 'use-memo' && <UseMemo />}
    </div>
  );
};

export default App;
