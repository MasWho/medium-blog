import './App.css';
import Table from './components/Table';
import EpicTableContainer from './store/store';
import { mockData } from './model/mockData';

function App() {
  return (
    <div className="App">
      <EpicTableContainer data={mockData}>
        <Table/>
      </EpicTableContainer>
    </div>
  );
}

export default App;
