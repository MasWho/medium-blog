import './App.css';
import Table from './components/Table';
import { EpicTableStoreProvider } from './store/EpicTableStoreProvider';

function App() {
  return (
    <div className="App">
      <EpicTableStoreProvider>
        <Table/>
      </EpicTableStoreProvider>
    </div>
  );
}

export default App;
