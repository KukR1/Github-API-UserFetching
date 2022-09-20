import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context, UserContext } from './components/useContext';
import History from './History';
import { HistoryData, Overview } from './Overview';

function App() {
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [user, setUser] = useState('');
  return (
    <>
      <Context.Provider value={{ history, setHistory }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </UserContext.Provider>
      </Context.Provider>
    </>
  );
}

export default App;
