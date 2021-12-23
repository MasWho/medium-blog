/**
 * NOTE:
 * 1. Try use css module
 * 2. Things in App should be sectioned input HOCs
 */

import AppStyles from './styles/App.module.css';
import ButtonStyles from './styles/Button.module.css';
import { State, Refs, SideEffects } from './Hooks';
import { CompUpdates, Revaluation, MemoAndCallback, StateManagement, UseMemo } from './Perfomance';
import React, {useState} from 'react';


const TopTabs = ({onClickTab, selectedTab}) => {
  const tabs = ['hooks', 'performance'].map((topic, idx) => {
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
    <div className={AppStyles.TopTabs}>
      {tabs}
    </div>
  );
};


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
  const [topTab, setTopTab] = useState('hooks');
  const [tab, setTab] = useState('state');

  const clickTabHandler = (type, topic) => {
    if(type === 'top') {
      setTopTab(topic);
      if(topic === 'hooks') {
        setTab('state');
      } else {
        setTab('update')
      }
    } else {
      setTab(topic);

    }
  };

  return (
    <div className={AppStyles.App}>
        <TopTabs onClickTab={clickTabHandler.bind(null, 'top')} selectedTab={topTab}/>
        {topTab === 'hooks' && (
          <>
            <Tabs onClickTab={clickTabHandler.bind(null, 'section')} tabs={['state', 'refs', 'effects']} selectedTab={tab} />
            {tab === 'state' && <State />}
            {tab === 'refs' && <Refs />}
            {tab === 'effects' && <SideEffects />}
          </>
        )}
        {topTab === 'performance' && (
          <>
            <Tabs onClickTab={clickTabHandler.bind(null, 'section')} tabs={['update', 'revaluation', 'memo-and-callback', 'state-management', 'use-memo']} selectedTab={tab} />
            {tab === 'update' && <CompUpdates />}
            {tab === 'revaluation' && <Revaluation />}
            {tab === 'memo-and-callback' && <MemoAndCallback />}
            {tab === 'state-management' && <StateManagement />}
            {tab === 'use-memo' && <UseMemo />}
          </>
        )}
    </div>
  );
};

export default App;
