import Docs from './components/docs';
import './App.css';
import { app, database } from './firebase/firebaseConfig';
import { Routes, Route } from 'react-router-dom';
import EditDocs from './components/editDocs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs database={database}/>}/>
      {/* specify path, we will navigate to specified path based on unique id in docs.js using navigate */}
      <Route path="/editDocs/:id" element={<EditDocs database={database}/>}/>
    </Routes>
  );
}

export default App;
